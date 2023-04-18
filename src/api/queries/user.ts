import { type Union } from "@d-exclaimation/common/union";
import { z } from "zod";
import {
  clearSession,
  session,
  setSession,
  setUserId,
  userId,
} from "../../common/utils/storage";
import { api } from "../url";

const User = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

const UserEmail = z.object({
  email: z.string(),
});

export type UserInfo = z.infer<typeof UserInfo>;
const UserInfo = z.intersection(User, UserEmail);

const LoginResponse = z.object({
  userId: z.coerce.number(),
  token: z.string(),
});

export async function me() {
  const id = userId();
  if (!id) {
    return null;
  }
  try {
    const res = await fetch(`${api}/users/${id}`, {
      headers: {
        "X-Authorization": session() ?? "",
      },
    });
    if (res.status !== 200) {
      return null;
    }
    const raw = await res.json();
    const maybeUser = await UserInfo.safeParseAsync(raw);
    if (!maybeUser.success) {
      return null;
    }
    return {
      id,
      ...maybeUser.data,
      timestamp: new Date().toISOString(),
    };
  } catch (_) {
    return null;
  }
}

type AuthResponse = Union<{
  Ok: z.infer<typeof LoginResponse>;
  BadEmail: {};
  BadInput: { message: string };
  Error: { message: string };
}>;

export async function register(user: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const res1 = await fetch(`${api}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (res1.status !== 200 && res1.status !== 201) {
      switch (res1.status) {
        case 400:
          return { kind: "BadInput", message: res1.statusText };
        case 403:
          return { kind: "BadEmail" };
        default:
          return { kind: "Error", message: res1.statusText };
      }
    }

    const res2 = await fetch(`${api}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        password: user.password,
      }),
    });

    if (res2.status !== 200 && res2.status !== 201) {
      return { kind: "Error", message: res2.statusText };
    }

    const raw = await res2.json();

    const maybeLogin = await LoginResponse.safeParseAsync(raw);

    if (!maybeLogin.success) {
      return { kind: "Error", message: "Unknown error" };
    }

    setUserId(maybeLogin.data.userId.toString());
    setSession(maybeLogin.data.token);

    return {
      kind: "Ok",
      ...maybeLogin.data,
    };
  } catch (e: unknown) {
    return { kind: "Error", message: `Unknown error, ${e}` };
  }
}

export async function login(info: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  try {
    const res = await fetch(`${api}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    });

    if (res.status !== 200 && res.status !== 201) {
      switch (res.status) {
        case 400:
          return { kind: "BadInput", message: res.statusText };
        case 401:
          return { kind: "BadEmail" };
        default:
          return { kind: "Error", message: res.statusText };
      }
    }

    const raw = await res.json();
    const maybeLogin = await LoginResponse.safeParseAsync(raw);

    if (!maybeLogin.success) {
      return { kind: "Error", message: "Unknown error" };
    }

    setUserId(maybeLogin.data.userId.toString());
    setSession(maybeLogin.data.token);

    return {
      kind: "Ok",
      ...maybeLogin.data,
    };
  } catch (e: unknown) {
    return { kind: "Error", message: `Unknown error, ${e}` };
  }
}

export async function logout() {
  try {
    await fetch(`${api}/users/logout`, {
      method: "POST",
      headers: {
        "X-Authorization": session() ?? "",
      },
    });
    clearSession();
  } catch (_) {}
}

type EditResponse = Union<{
  Ok: {};
  BadInput: { message: string };
  Unauthorized: {};
  Fordidden: {};
  Error: { message: string };
}>;

export async function edit({
  file,
  ...info
}: {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  file?: File;
}): Promise<EditResponse> {
  const id = userId();
  if (!id) {
    return {
      kind: "Unauthorized",
    };
  }
  try {
    const res1 = await fetch(`${api}/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": session() ?? "",
      },
      body: JSON.stringify(info),
    });
    if (res1.status !== 200 && res1.status !== 201) {
      switch (res1.status) {
        case 400:
          return { kind: "BadInput", message: res1.statusText };
        case 401:
          return { kind: "Unauthorized" };
        case 403:
          return { kind: "Fordidden" };
        default:
          return { kind: "Error", message: res1.statusText };
      }
    }

    if (file) {
      const res2 = await fetch(`${api}/users/${id}/image`, {
        method: "PUT",
        headers: {
          "X-Authorization": session() ?? "",
          "Content-Type": file.type,
        },
        body: file,
      });

      if (res2.status !== 200 && res2.status !== 201) {
        switch (res2.status) {
          case 400:
            return { kind: "BadInput", message: res2.statusText };
          case 401:
            return { kind: "Unauthorized" };
          case 403:
            return { kind: "Fordidden" };
          default:
            return { kind: "Error", message: res2.statusText };
        }
      }
    }
    return {
      kind: "Ok",
    };
  } catch (e) {
    return {
      kind: "Error",
      message: `Unknown error, ${e}`,
    };
  }
}

export async function setAvatar(file: File) {
  const id = userId();
  if (!id) {
    return;
  }
  try {
    await fetch(`${api}/users/${id}/image`, {
      method: "PUT",
      headers: {
        "X-Authorization": session() ?? "",
        "Content-Type": file.type,
      },
      body: file,
    });
  } catch (_) {
    return;
  }
}

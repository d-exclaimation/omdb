import { type Union } from "@d-exclaimation/common/union";
import { int } from "../common/utils/coerce";
import {
  clearSession,
  session,
  setSession,
  setUserId,
  userId,
} from "../common/utils/storage";
import {
  LoginResponse,
  UserInfo,
  type EditUser,
  type LoginUser,
  type RegisterUser,
} from "../types/user";
import { api } from "./url";
import { mutation, query } from "./utils";

export const me = query(["me"], async () => {
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
      id: int.parse(id),
      ...maybeUser.data,
    };
  } catch (_) {
    return null;
  }
});

type AuthResponse = Union<{
  Ok: LoginResponse;
  BadEmail: {};
  BadInput: { message: string };
  Error: { message: string };
}>;

export const register = mutation(
  ["users", "signup"],
  async (arg: RegisterUser): Promise<AuthResponse> => {
    try {
      const res1 = await fetch(`${api}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arg),
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
          email: arg.email,
          password: arg.password,
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
);

export const login = mutation(
  ["users", "login"],
  async (info: LoginUser): Promise<AuthResponse> => {
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
);

export const logout = mutation(["users", "logout"], async (_: void) => {
  try {
    await fetch(`${api}/users/logout`, {
      method: "POST",
      headers: {
        "X-Authorization": session() ?? "",
      },
    });
    clearSession();
  } catch (_) {}
});

type EditResponse = Union<{
  Ok: {};
  BadInput: { message: string };
  Unauthorized: {};
  Fordidden: {};
  Error: { message: string };
}>;

type EditInput = EditUser & { file?: File | null };

export const edit = mutation(
  ["users", "edit"],
  async (arg: EditInput): Promise<EditResponse> => {
    const { file, ...info } = arg;
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
      if (file === null) {
        await fetch(`${api}/users/${id}/image`, {
          method: "DELETE",
          headers: {
            "X-Authorization": session() ?? "",
          },
        });
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
);

export const setAvatar = mutation(
  ["users", "signup", "avatar"],
  async (arg: File) => {
    const id = userId();
    if (!id) {
      return;
    }
    try {
      await fetch(`${api}/users/${id}/image`, {
        method: "PUT",
        headers: {
          "X-Authorization": session() ?? "",
          "Content-Type": arg.type,
        },
        body: arg,
      });
    } catch (_) {
      return;
    }
  }
);

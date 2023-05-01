import { z } from "zod";
import { sensiblespaces } from "../common/utils/refinements";

export type User = z.infer<typeof User>;
export const User = z.object({
  firstName: z.string(),
  lastName: z.string(),
});

export type UserEmail = z.infer<typeof UserEmail>;
export const UserEmail = z.object({
  email: z.string(),
});

export type UserInfo = z.infer<typeof UserInfo>;
export const UserInfo = z.intersection(User, UserEmail);

export type LoginResponse = z.infer<typeof LoginResponse>;
export const LoginResponse = z.object({
  userId: z.coerce.number(),
  token: z.string(),
});

export type LoginUser = z.infer<typeof LoginUser>;
export const LoginUser = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string(),
});

export type RegisterUser = z.infer<typeof RegisterUser>;
export const RegisterUser = z.object({
  firstName: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(64, "Must be at most 64 characters long")
    .refine(
      sensiblespaces,
      "Must contain leading, trailing or consecutive spaces"
    ),
  lastName: z
    .string()
    .min(1, "Must be at least 1 character long")
    .max(64, "Must be at most 64 characters long")
    .refine(
      sensiblespaces,
      "Must contain leading, trailing or consecutive spaces"
    ),
  email: z
    .string()
    .email("Must be a valid email")
    .min(1, "Must be at least 1 character long")
    .max(256, "Must be at most 256 characters long"),
  password: z
    .string()
    .min(6, "Must be at least 6 characters long")
    .max(64, "Must be at most 64 characters long"),
});

export type EditUser = z.infer<typeof EditUser>;
export const EditUser = z
  .object({
    firstName: z
      .string()
      .min(1, "Must be at least 1 character long")
      .max(64, "Must be at most 64 characters long")
      .refine(
        sensiblespaces,
        "Must contain leading, trailing or consecutive spaces"
      ),
    lastName: z
      .string()
      .min(1, "Must be at least 1 character long")
      .max(64, "Must be at most 64 characters long")
      .refine(
        sensiblespaces,
        "Must contain leading, trailing or consecutive spaces"
      ),
    email: z
      .string()
      .email("Must include an @ symbol and a top level domain")
      .min(1, "Must be at least 1 character long")
      .max(256, "Must be at most 256 characters long"),
    password: z
      .string()
      .min(6, "Must be at least 6 characters long")
      .max(64, "Must be at most 64 characters long")
      .optional(),
    currentPassword: z
      .string()
      .min(6, "Must be at least 6 characters long")
      .max(64, "Must be at most 64 characters long")
      .optional(),
  })
  .refine(
    ({ password, currentPassword }) =>
      password !== undefined ? currentPassword !== undefined : true,
    {
      message: "Current password is required to change password",
      path: ["currentPassword"],
    }
  )
  .refine(
    ({ password, currentPassword }) =>
      password && currentPassword ? password !== currentPassword : true,
    {
      message: "New password is identical to current",
      path: ["password"],
    }
  );

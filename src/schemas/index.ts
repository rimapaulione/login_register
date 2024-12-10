import { newPassword } from "@/actions/new-password";
import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email required!" })
    .email({ message: "Email is required" }),
  password: z.string().trim().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email required!" })
    .email({ message: "Email is required" }),
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must have at least 6 characters!" }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "Password is required" }),
  firstname: z.string().trim().min(1, {
    message: "Name is required",
  }),
  lastname: z.string().trim().min(1, {
    message: "Name is required",
  }),
});

export const ResetSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, { message: "Email required!" })
    .email({ message: "Email is required" }),
});

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .trim()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must have at least 6 characters!" }),
  confirmPassword: z
    .string()
    .trim()
    .min(1, { message: "Password is required" }),
  oldPassword: z.string().trim().min(1, { message: "Password is required" }),
});

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().trim().min(1, {
        message: "Name is required",
      })
    ),
    role: z.enum(["USER", "ADMIN"]),
    lastName: z.optional(
      z.string().trim().min(1, {
        message: "Last Name is required",
      })
    ),
    oldPassword: z.optional(
      z
        .string()
        .trim()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must have at least 6 characters!" })
    ),
    newPassword: z.optional(
      z
        .string()
        .trim()
        .min(1, { message: "Password is required" })
        .min(6, { message: "Password must have at least 6 characters!" })
    ),
  })
  .refine(
    (data) => {
      if (data.oldPassword && !data.newPassword) return false;

      return true;
    },
    {
      message: "New password is requided!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.oldPassword) return false;

      return true;
    },
    {
      message: "Old password is requided!",
      path: ["newPassword"],
    }
  );

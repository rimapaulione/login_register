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

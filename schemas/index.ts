import { UserRole } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "Enter your current password to change your password." }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    { message: "Enter a new password to change your password." }
  );

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "must be a string.",
    })
    .email({
      message: "email is required and must be a valid email address.",
    }),
  password: z
    .string({ invalid_type_error: "must be a string" })
    .min(1, { message: "Password is required." }),
  code: z.optional(z.string()),
});

export const NewPasswordSchema = z
  .object({
    password: z
      .string({ invalid_type_error: "must be a string" })
      .min(6, { message: "Minimum 6 characters required." }),
    confirmPassword: z
      .string({ invalid_type_error: "must be a string" })
      .min(6, { message: "Minimum 6 characters required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const ResetSchema = z.object({
  email: z
    .string({
      invalid_type_error: "must be a string.",
    })
    .email({
      message: "email is required and must be a valid email address.",
    }),
});

export const RegisterSchema = z
  .object({
    email: z
      .string({
        invalid_type_error: "must be a string.",
      })
      .email({
        message: "email is required and must be a valid email address.",
      }),
    password: z
      .string({ invalid_type_error: "must be a string" })
      .min(6, { message: "Minimum 6 characters required." }),
    name: z.string().min(1, { message: "Name is required." }),
    confirmPassword: z
      .string({ invalid_type_error: "must be a string" })
      .min(6, { message: "Minimum 6 characters required." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

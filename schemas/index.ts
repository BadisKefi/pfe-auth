import { UserRole } from "@prisma/client";
import * as z from "zod";

// main

export const ProductFormSchema = z.object({
  label: z.string().min(1, { message: "product label is required" }),
  price: z.coerce.number().min(0.01, { message: "product price is required" }),
  images: z.array(z.string().url()).optional(),
  description: z.string().optional(),
  detailedDescription: z.string().optional(),
  informations: z.string().optional(),
  category: z.string({
    required_error: "Please select a category.",
  }),
});
export const ProductTableSchema = z.object({
  id: z.string(),
  label: z.string().min(1, { message: "product label is required" }),
  price: z.number().min(0.01, { message: "product price is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
  images: z.array(z.string().url()).optional(),
});

export const CategoryFormSchema = z.object({
  label: z.string().min(1, { message: "product label is required" }),
  image: z.string().url().optional(),
  description: z.string().optional(),
  detailedDescription: z.string().optional(),
});
export const CategoryTableSchema = z.object({
  id: z.string(),
  label: z.string().min(1, { message: "product label is required" }),
  createdAt: z.date(),
  updatedAt: z.date(),
  image: z.string().url().optional(),
  description: z.string().optional(),
});

// auth

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
    { message: "password required!", path: ["password"] }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    { message: "New password required!", path: ["newPassword"] }
  );

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password Is Required & Minimum 6 Characters" }),
  confirmPassword: z
    .string()
    .min(6, { message: "Confirm password Is Required" }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});
export const LoginSchema = z.object({
  email: z.string().email({ message: "Email Is Required" }),
  password: z.string().min(1, { message: "Password Is Required" }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email Is Required" }),
  password: z
    .string()
    .min(6, { message: "Password Is Required & Minimum 6 Characters" }),
  name: z.string().min(1, { message: "Name Is Required" }),
});

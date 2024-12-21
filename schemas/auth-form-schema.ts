import { z } from "zod";

const signInSchema = z.object({
  reference: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});
const signUpSchema = z
  .object({
    userName: z
      .string()
      .min(3, { message: "Username must be at least 3 characters." }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: z.string().min(8), // This field should not be sent during sign-up
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
const requestResetPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
});
const confirmResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8)
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number" })
      .regex(/[@$!%*?&#]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmNewPassword: z.string().min(8),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;
type RequestResetPasswordSchemaType = z.infer<
  typeof requestResetPasswordSchema
>;
type ConfirmResetPasswordSchemaType = z.infer<
  typeof confirmResetPasswordSchema
>;

export {
  signInSchema,
  signUpSchema,
  requestResetPasswordSchema,
  confirmResetPasswordSchema,
};
export type {
  SignInForm,
  SignUpForm,
  ConfirmResetPasswordSchemaType,
  RequestResetPasswordSchemaType,
};

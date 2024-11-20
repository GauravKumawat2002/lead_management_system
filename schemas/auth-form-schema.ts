import { z } from "zod";

const signInSchema = z.object({
  reference: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8),
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

type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema };
export type { SignInForm, SignUpForm };

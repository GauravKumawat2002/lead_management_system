import { z } from "zod";

const signInSchema = z.object({
  userName: z.string().min(3, { message: "Username must be atleast 3 characters." }),
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8),
});
const signUpSchema = z
  .object({
    userName: z.string().min(3, { message: "Username must be atleast 3 characters." }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SignInForm = z.infer<typeof signInSchema>;
type SignUpForm = z.infer<typeof signUpSchema>;

export { signInSchema, signUpSchema };
export type { SignInForm, SignUpForm };

import { SignInForm, SignUpForm } from "@/schemas/auth-form-schema";
export global {
  type FormType = "signIn" | "signUp";

  type FormSchema = SignInForm | SignUpForm;

  interface AuthFormProps {
    type: FormType;
  }
}

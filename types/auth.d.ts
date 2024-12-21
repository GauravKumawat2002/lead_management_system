import {
  SignInForm,
  SignUpForm,
  ConfirmResetPasswordSchemaType,
  RequestResetPasswordSchemaType,
} from "@/schemas/auth-form-schema";
export global {
  type FormType =
    | "signIn"
    | "signUp"
    | "requestResetPassword"
    | "confirmResetPassword";

  type FormSchema =
    | SignInForm
    | SignUpForm
    | RequestResetPasswordSchemaType
    | ConfirmResetPasswordSchemaType;
  interface AuthFormProps {
    type: FormType;
    onSubmit: (data: FormSchema) => void;
  }
  interface ResetPasswordFormProps {
    type: FormType;
    onSubmit?: (data: FormSchema) => void;
  }
}

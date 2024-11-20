"use client";
import AuthForm from "@/components/custom/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { storeToken } from "@/lib/tokenStorage";
import { getErrorMessage } from "@/lib/utils";
import { ROUTES } from "@/routes/routes";
import { SignInForm } from "@/schemas/auth-form-schema";
import { signInService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const errorMessages = {
  "Access denied !! User not verified with Reference : ":
    "Access Denied!! Please verify your email to login",
  "Access denied !! Error: Invalid Username or Password !!":
    "Access Denied!! Invalid Username or Password",
  "Error: User not found by Email: ": "User not found by Email. Please Sign Up",
};
export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        const { data: response, error } = await signInService(
          data as SignInForm,
        );
        if (error) throw error;
        response?.jwtToken && storeToken(response?.jwtToken);
        router.push(ROUTES.HOME);
      } catch (error: any) {
        toast({
          title: "Error",
          description: getErrorMessage(error.data, errorMessages),
          variant: "destructive",
          className: "text-xl font-semibold",
        });
      }
    },
    [router],
  );

  return (
    <div>
      <AuthForm type="signIn" onSubmit={onSubmit} />
    </div>
  );
}

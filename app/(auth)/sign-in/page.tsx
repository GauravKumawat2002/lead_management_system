"use client";
import AuthForm from "@/components/custom/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { storeToken } from "@/lib/tokenStorage";
import { ROUTES } from "@/routes/routes";
import { SignInForm } from "@/schemas/auth-form-schema";
import { signInService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

// "Error: User not found by Email: ": "User not found by Email. Please Sign Up",
// refreshTOken Api: Error: Invalid Refresh Token
// this response is for all api that has jwt token in header or autherror
// Access denied !! Full authentication is required to access this resource
// SignUP: Email already exists, try login !!!
// get lead BY ID: Error: Lead not found

export default function SignIn() {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        const response = await signInService(data as SignInForm);
        if ("error" in response) {
          throw response.error;
        }
        if ("data" in response) {
          storeToken(response.data.jwtToken);
          router.push(ROUTES.HOME);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.data,
          variant: "destructive",
          className: "text-xl font-semibold",
        });
      }
    },
    [router, toast],
  );

  return (
    <div>
      <AuthForm type="signIn" onSubmit={onSubmit} />
    </div>
  );
}
// Possible error messages
// 1. Error: Invalid JWTHeader
// 2. User not Signed-in!!! -> Unable to sign-in! Please try again.Unable to sign-in! Please try again.

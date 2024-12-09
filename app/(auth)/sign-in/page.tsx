"use client";
import AuthForm from "@/components/custom/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { setTokenCookie } from "@/lib/tokenStorage";
import { extractTokenExpirationTime } from "@/lib/tokenStorage";
import { ROUTES } from "@/routes/routes";
import { SignInForm } from "@/schemas/auth-form-schema";
import { signInService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

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
          const { jwtToken, refreshToken } = response.data;
          setTokenCookie(
            "jwtToken",
            jwtToken,
            extractTokenExpirationTime(jwtToken),
          );
          setTokenCookie(
            "refreshToken",
            refreshToken,
            extractTokenExpirationTime(refreshToken),
          );
          router.push(ROUTES.HOME);
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description:
            error.data === "Error: unknown error"
              ? "Please verify your email and try again"
              : error.data,
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

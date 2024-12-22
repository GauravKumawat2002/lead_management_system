import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import {
  ConfirmResetPasswordSchemaType,
  RequestResetPasswordSchemaType,
  SignInForm,
  SignUpForm,
} from "@/schemas/auth-form-schema";
import {
  confirmResetPasswordService,
  requestResetPasswordService,
  signInService,
  signUpService,
} from "@/services/authService";
import { setTokenCookie, extractTokenExpirationTime } from "@/lib/tokenStorage";

export function useResetPassword(type: "request" | "confirm", token?: string) {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = useCallback(
    async (data: FormSchema, onReset?: () => void) => {
      try {
        let response;
        if (type === "request") {
          const result = await requestResetPasswordService(
            (data as RequestResetPasswordSchemaType).email,
          );
          response = result.data;
        } else if (type === "confirm" && token) {
          const result = await confirmResetPasswordService(
            data as ConfirmResetPasswordSchemaType,
            token,
          );
          response = result.data;
        }

        console.log(response);
        onReset && onReset();
        toast({
          title: "Success",
          description: response,
        });

        if (type === "confirm") {
          router.push(ROUTES.SIGNIN);
        }
      } catch (error: any) {
        console.log(error);
        toast({
          title: "Error",
          variant: "destructive",
          description: error.data,
          className: "text-lg font-semibold",
        });
      }
    },
    [type, token, toast, router],
  );

  return { onSubmit };
}

export function useAuth(type: "sign-in" | "sign-up") {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
        if (type === "sign-in") {
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
        }
        if (type === "sign-up") {
          const { data: response, error } = await signUpService(
            data as SignUpForm,
          );
          if (error) throw error;
          console.log(response);
          toast({
            title: "Success",
            description:
              "Please check your e-mail for account verification then log-in",
          });
          router.push(ROUTES.SIGNIN);
        }
      } catch (error: any) {
        if (type === "sign-in") {
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
        if (type === "sign-up") {
          toast({
            title: "Error",
            variant: "destructive",
            description: error.data,
            className: "text-lg font-semibold",
          });
        }
      }
    },
    [router, toast, type],
  );
  return { onSubmit };
}

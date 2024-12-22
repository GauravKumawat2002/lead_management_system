import { useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes/routes";
import {
  ConfirmResetPasswordSchemaType,
  RequestResetPasswordSchemaType,
} from "@/schemas/auth-form-schema";
import {
  confirmResetPasswordService,
  requestResetPasswordService,
} from "@/services/authService";

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

export function useAuth(type: "sign-in" | "sign-up") {}

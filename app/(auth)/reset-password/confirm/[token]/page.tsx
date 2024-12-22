"use client";
import ResetPasswordForm from "@/components/custom/auth/reset-password-form";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/routes/routes";
import { ConfirmResetPasswordSchemaType } from "@/schemas/auth-form-schema";
import { confirmResetPasswordService } from "@/services/authService";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ConfirmResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const { toast } = useToast();
  const router = useRouter();
  const onSubmit = useCallback(
    async (data: FormSchema, onReset?: () => void) => {
      try {
        const { data: response } = await confirmResetPasswordService(
          data as ConfirmResetPasswordSchemaType,
          params.token,
        );
        // if (status !== 200) throw response;
        console.log(response);
        onReset && onReset();
        toast({
          title: "Success",
          description: response,
        });
        router.push(ROUTES.SIGNIN);
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
    [],
  );
  return <ResetPasswordForm type="confirmResetPassword" onSubmit={onSubmit} />;
}

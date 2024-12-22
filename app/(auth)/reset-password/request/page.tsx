"use client";
import React, { useCallback, lazy, Suspense } from "react";
import { useToast } from "@/hooks/use-toast";
import { RequestResetPasswordSchemaType } from "@/schemas/auth-form-schema";
import { requestResetPasswordService } from "@/services/authService";

const ResetPasswordForm = lazy(
  () => import("@/components/custom/auth/reset-password-form"),
);

export default function RequestResetPasswordPage() {
  const { toast } = useToast();

  const onSubmit = useCallback(async (data: FormSchema) => {
    try {
      const { data: response, status } = await requestResetPasswordService(
        (data as RequestResetPasswordSchemaType).email,
      );
      if (status !== 200) throw response;
      console.log(response);
      toast({
        title: "Success",
        description: response,
      });
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Error",
        variant: "destructive",
        description: error.data,
        className: "text-lg font-semibold",
      });
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm type="requestResetPassword" onSubmit={onSubmit} />
    </Suspense>
  );
}

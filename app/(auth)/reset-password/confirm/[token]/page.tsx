"use client";
import ResetPasswordForm from "@/components/custom/auth/reset-password-form";
import { useResetPassword } from "@/data/auth";

export default function ConfirmResetPasswordPage({
  params,
}: {
  params: { token: string };
}) {
  const { onSubmit } = useResetPassword("confirm", params.token);
  return <ResetPasswordForm type="confirmResetPassword" onSubmit={onSubmit} />;
}

"use client";
import React, { lazy, Suspense } from "react";

import { useResetPassword } from "@/data/auth";

const ResetPasswordForm = lazy(
  () => import("@/components/custom/auth/reset-password-form"),
);

export default function RequestResetPasswordPage() {
  const { onSubmit } = useResetPassword("request");

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm type="requestResetPassword" onSubmit={onSubmit} />
    </Suspense>
  );
}

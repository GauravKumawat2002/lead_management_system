"use client";
import React, { lazy, Suspense } from "react";

import { useResetPassword } from "@/data/auth";
import LoadingSpinner from "@/components/custom/shared/loading-spinner";

const ResetPasswordForm = lazy(
  () => import("@/components/custom/auth/reset-password-form"),
);

export default function RequestResetPasswordPage() {
  const { onSubmit } = useResetPassword("request");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordForm type="requestResetPassword" onSubmit={onSubmit} />
    </Suspense>
  );
}

"use client";

import AuthForm from "@/components/custom/auth/auth-form";
import { useAuth } from "@/data/auth";

export default function Page() {
  const { onSubmit } = useAuth("sign-up");

  return (
    <div>
      <AuthForm type="signUp" onSubmit={onSubmit} />
    </div>
  );
}

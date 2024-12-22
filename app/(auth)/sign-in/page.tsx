"use client";
import AuthForm from "@/components/custom/auth/auth-form";
import { useAuth } from "@/data/auth";

export default function SignIn() {
  const { onSubmit } = useAuth("sign-in");
  return (
    <div>
      <AuthForm type="signIn" onSubmit={onSubmit} />
    </div>
  );
}

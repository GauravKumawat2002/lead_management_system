"use client";

import AuthForm from "@/components/custom/auth/auth-form";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/routes/routes";
import { SignUpForm } from "@/schemas/auth-form-schema";
import { signUpService } from "@/services/authService";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export default function Page() {
  const router = useRouter();
  const { toast } = useToast();
  const onSubmit = useCallback(
    async (data: FormSchema) => {
      try {
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
    [router],
  );

  return (
    <div>
      <AuthForm type="signUp" onSubmit={onSubmit} />
    </div>
  );
}

"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomFormField from "@/components/custom/shared/custom-form-field";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";

import {
  requestResetPasswordSchema,
  confirmResetPasswordSchema,
  RequestResetPasswordSchemaType,
  ConfirmResetPasswordSchemaType,
} from "@/schemas/auth-form-schema";
import { ROUTES } from "@/routes/routes";
import { LockKeyholeOpen } from "lucide-react";
export default function ResetPasswordForm({
  onSubmit,
  type,
}: ResetPasswordFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(
      type === "requestResetPassword"
        ? requestResetPasswordSchema
        : confirmResetPasswordSchema,
    ),
    defaultValues:
      type === "requestResetPassword"
        ? { email: "" }
        : { newPassword: "", confirmNewPassword: "" },
  });
  const formFields =
    type === "requestResetPassword"
      ? [
          {
            control: form.control,
            label: "Email",
            name: "email",
            placeholder: "Enter your email",
            type: "text",
          },
        ]
      : [
          {
            control: form.control,
            label: "New Password",
            name: "newPassword",
            placeholder: "Enter your new password",
            type: "password",
          },
          {
            control: form.control,
            label: "Confirm New Password",
            name: "confirmNewPassword",
            placeholder: "Confirm your new password",
            type: "password",
          },
        ];

  if (type === "requestResetPassword")
    return (
      <Card className="reset-password-form">
        <CardHeader className="gap-2 text-center lg:gap-4">
          <LockKeyholeOpen className="mx-auto h-8 w-8 text-primary lg:h-12 lg:w-12" />
          <CardTitle className="reset-password-form-card-title">
            Trouble logging in?
          </CardTitle>
          <p className="reset-password-form-card-description">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                onSubmit(data);
              })}
              method="POST"
            >
              {formFields.map((field) => (
                <CustomFormField
                  key={field.name}
                  control={field.control}
                  label={field.label}
                  name={field.name as keyof RequestResetPasswordSchemaType}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}
              <Button className="mt-4 w-full" type="submit">
                Send Reset Password Link
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          or
          <p className="mx-auto text-sm text-gray-500">
            <Link
              className="text-primary hover:text-primary/80"
              href={ROUTES.SIGNUP}
            >
              Create new account
            </Link>
          </p>
        </CardFooter>
      </Card>
    );

  return (
    <Card className="reset-password-form">
      <CardHeader className="gap-2 text-center">
        <CardTitle className="reset-password-form-card-title">
          Create A Strong Password
        </CardTitle>
        <p className="reset-password-form-card-description">
          Your password must be at least 8 characters long and contain a mix of
          uppercase letters, lowercase letters, numbers, and special characters.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => onSubmit(data, form.reset))}
            method="POST"
          >
            {formFields.map((field) => (
              <CustomFormField
                key={field.name}
                control={field.control}
                label={field.label}
                name={field.name as keyof ConfirmResetPasswordSchemaType}
                placeholder={field.placeholder}
                type={field.type}
              />
            ))}
            <Button className="mt-4 w-full" type="submit">
              Reset Password
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

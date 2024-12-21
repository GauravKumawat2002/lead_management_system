"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import CustomFormField from "../shared/custom-form-field";

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
  signInSchema,
  signUpSchema,
  SignInForm,
  SignUpForm,
} from "@/schemas/auth-form-schema";
import { ROUTES } from "@/routes/routes";

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(type === "signIn" ? signInSchema : signUpSchema),
    defaultValues:
      type === "signIn"
        ? { userName: "", email: "", password: "" }
        : { userName: "", email: "", password: "", confirmPassword: "" },
  });

  // Define form fields based on the form type
  const FormFields =
    type === "signIn"
      ? [
          {
            control: form.control,
            label: "Email",
            name: "reference",
            placeholder: "Enter your e-mail",
            type: "text",
          },
          {
            control: form.control,
            label: "Password",
            name: "password",
            placeholder: "Enter your password",
            type: "password",
          },
        ]
      : [
          {
            control: form.control,
            label: "Email",
            name: "email",
            placeholder: "Enter your email",
            type: "text",
          },
          {
            control: form.control,
            label: "Username",
            name: "userName",
            placeholder: "Enter your username",
            type: "text",
          },
          {
            control: form.control,
            label: "Password",
            name: "password",
            placeholder: "Enter your password",
            type: "password",
          },
          {
            control: form.control,
            label: "Confirm Password",
            name: "confirmPassword",
            placeholder: "Confirm your password",
            type: "password",
          },
        ];

  return (
    <Card className="auth-form w-[80vw] md:w-[60vw] lg:w-[50vw]">
      <CardHeader>
        <CardTitle className="card-title text-3xl font-semibold uppercase tracking-wider text-primary">
          {type === "signIn" ? "Sign In" : "Sign Up"}
        </CardTitle>
        <p className="text-lg font-normal text-gray-500">
          Please enter your details
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
            {type === "signIn"
              ? FormFields.map((field) => (
                  <CustomFormField
                    key={field.name}
                    control={field.control}
                    label={field.label}
                    name={field.name as keyof SignInForm}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                ))
              : FormFields.map((field) => (
                  <CustomFormField
                    key={field.name}
                    control={field.control}
                    label={field.label}
                    name={field.name as keyof SignUpForm}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                ))}
            <Button className="mt-4 w-full" type="submit">
              {type === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        or
        <Button className="w-fit" disabled variant={"outline"}>
          Continue with Google
        </Button>
        <div className="mx-auto text-sm text-gray-500">
          {type === "signIn" ? (
            <div className="flex flex-col items-center gap-2">
              <p>
                Don't have an account?{" "}
                <Link
                  className="text-primary hover:text-primary/80"
                  href={ROUTES.SIGNUP}
                >
                  Sign Up
                </Link>
              </p>
              or
              <Link
                className="text-primary hover:text-primary/80"
                href={ROUTES.FORGOT_PASSWORD}
              >
                Forgot Password ?
              </Link>
            </div>
          ) : (
            <>
              Already have an account?
              <Link
                className="text-primary hover:text-primary/80"
                href={ROUTES.SIGNIN}
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

// if at signIn page then continue with google should logIn the user and redirect to home page
// if at signUp page then continue with google should register the user via google api and redirect to home page

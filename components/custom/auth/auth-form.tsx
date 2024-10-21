"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import CustomFormField from "../shared/custom-form-field";
import { Button } from "@/components/ui/button";
import { signInSchema, signUpSchema, SignInForm, SignUpForm } from "@/schemas/auth-form-schema";
import Link from "next/link";

export default function AuthForm({ type }: AuthFormProps) {
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
            name: "userName",
            label: "Username",
            placeholder: "Enter your username",
          },
          {
            control: form.control,
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
          },
          {
            control: form.control,
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
          },
        ]
      : [
          {
            control: form.control,
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
          },
          {
            control: form.control,
            name: "userName",
            label: "Username",
            placeholder: "Enter your username",
          },
          {
            control: form.control,
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
          },
          {
            control: form.control,
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Confirm your password",
          },
        ];

  function onSubmit(data: FormSchema) {
    // instead of this console.log, send the data via api to backend

    // if (type === "signUp" && data.password !== (data as SignUpForm).confirmPassword) {
    //   alert("Passwords do not match");
    //   return;
    // }

    console.log(data);
    form.reset();
  }

  return (
    <Card className="auth-form w-[80vw] md:w-[60vw] lg:w-[50vw] ">
      <CardHeader>
        <CardTitle className="card-title text-3xl text-primary font-semibold uppercase tracking-wider">
          {type === "signIn" ? "Sign In" : "Sign Up"}
        </CardTitle>
        <p className="text-lg text-gray-500 font-normal">Please enter your details</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} method="POST">
            {type === "signIn"
              ? FormFields.map(field => (
                  <CustomFormField
                    key={field.name}
                    name={field.name as keyof SignInForm}
                    control={field.control}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                ))
              : FormFields.map(field => (
                  <CustomFormField
                    key={field.name}
                    name={field.name as keyof SignUpForm}
                    control={field.control}
                    label={field.label}
                    placeholder={field.placeholder}
                  />
                ))}
            <Button className="w-full mt-4" type="submit">
              {type === "signIn" ? "Sign In" : "Sign Up"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="">
        <p className="text-gray-500 text-sm mx-auto">
          {type === "signIn" ? (
            <>
              Don't have an account?{" "}
              <Link className="text-primary hover:text-primary/80" href="/sign-up">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              Already have an account?
              <Link className="text-primary hover:text-primary/80" href="/sign-in">
                Sign In
              </Link>
            </>
          )}
        </p>
      </CardFooter>
    </Card>
  );
}

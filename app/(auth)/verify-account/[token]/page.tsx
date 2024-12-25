import ErrorDisplay from "@/components/custom/shared/error-display";
import { Button } from "@/components/ui/button";
import { CircleCheck } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROUTES } from "@/routes/routes";
import { verifyAccountService } from "@/services/authService";
import Link from "next/link";

export default async function VerifyAccountPage({
  params,
}: {
  params: { token: string };
}) {
  try {
    const response = await verifyAccountService(params.token);
    if (response.status !== 200) throw response.data;
    return (
      <Card className="base-form-width flex flex-col items-center text-center">
        <CardHeader className="relative mb-6 w-full">
          <div className="bg-wave absolute left-0 top-0 z-0 h-full w-full rounded-t-xl bg-gradient-to-r from-sky-500 to-indigo-500"></div>

          <CircleCheck className="z-10 mx-auto h-16 w-16 text-transparent" />
          <CardTitle className="z-10 text-3xl tracking-wider text-transparent">
            Email is Verified!
          </CardTitle>
        </CardHeader>

        <CardContent className="text-gray-700 dark:text-gray-200">
          <CardDescription>
            Your E-mail has been successfully verified. You can now go back to
            the login page to access the{" "}
            <span className="bg-gradient-to-r from-sky-500 via-blue-700 to-indigo-500 bg-clip-text text-lg font-bold text-transparent">
              Lead Management System.
            </span>
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={ROUTES.SIGNIN}>Back to login</Link>
          </Button>
        </CardFooter>
      </Card>
    );
  } catch (error: any) {
    return <ErrorDisplay message={error} />;
  }
}

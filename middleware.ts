import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./routes/routes";

export function middleware(request: NextRequest) {
  // logic for invalidting the jwtToken cookie and redirecting to sign-in page
  if (request.nextUrl.pathname === ROUTES.LOGOUT) {
    const response = NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
    response.cookies.set("jwtToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1, // Expire the cookie immediately
      path: "/", // Ensure it applies globally
    });
    return response;
  }

  // logic for checking the jwtToken cookie and redirecting to sign-in page
  const token = request.cookies.get("jwtToken");

  if (
    !token &&
    (request.nextUrl.pathname === ROUTES.SIGNIN ||
      request.nextUrl.pathname === ROUTES.SIGNUP)
  ) {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/leads/:path*", "/log-out"],
};

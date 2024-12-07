import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ROUTES } from "./routes/routes";
import { logOutService, refreshTokenService } from "./services/authService";
import { extractTokenExpirationTime } from "./lib/tokenStorage";

export async function middleware(request: NextRequest) {
  // logic for invalidting the jwtToken cookie and redirecting to sign-in page when the log-out route is hit
  if (request.nextUrl.pathname === ROUTES.LOGOUT) {
    try {
      const res = await logOutService();
      if (res.status !== 200) {
        throw res;
      }
    } catch (error: any) {
      console.error(error.data);
    }

    const response = NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
    response.cookies.delete("refreshToken");
    response.cookies.delete("jwtToken");
    return response;
  }

  const refreshToken = request.cookies.get("refreshToken");
  const jwtToken = request.cookies.get("jwtToken");

  // logic for checking the jwtToken cookie & refreshing the token
  if (!jwtToken) {
    try {
      const result = await refreshTokenService();
      if (!("jwtToken" in result)) {
        throw result;
      }
      const response = NextResponse.next();
      response.cookies.set("jwtToken", result.jwtToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
        maxAge: extractTokenExpirationTime(result.jwtToken),
      });
      return response;
    } catch (error) {
      console.error(error);
      return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
    }
  }

  // logic for checking the refreshToken cookie and redirecting to sign-in or sign-up page
  if (!refreshToken) {
    if (
      request.nextUrl.pathname === ROUTES.SIGNIN ||
      request.nextUrl.pathname === ROUTES.SIGNUP
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL(ROUTES.SIGNIN, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/leads/:path*", "/log-out"],
};

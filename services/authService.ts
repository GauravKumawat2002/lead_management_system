"use server";
import { SignInForm, SignUpForm } from "@/schemas/auth-form-schema";
import httpClient from "./httpClient";
import { cookies } from "next/headers";

interface SignInResponse {
  jwtToken: string;
  reference: string;
}
type ISignInResponse =
  | { data: SignInResponse }
  | { error: { data: "IDFK"; status: number } };

async function signUpService(data: Omit<SignUpForm, "confirmPassword">) {
  try {
    const response = await httpClient.post("/auth/signup", data);
    return { data: response.data };
  } catch (error: any) {
    return {
      error: { data: error.response.data, status: error.response.status },
    };
  }
}

async function signInService(data: SignInForm): Promise<ISignInResponse> {
  try {
    const response = await httpClient.post("/auth/signin", data);
    const token = response.data.jwtToken;
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const decodedTokenExpiry = decodedToken.exp * 1000;
    const remainingTime = Math.floor((decodedTokenExpiry - Date.now()) / 1000);

    if (response.data.jwtToken) {
      const cookiesStore = cookies();
      cookiesStore.set("jwtToken", response.data.jwtToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: remainingTime,
        path: "/",
      });
    }
    return { data: response.data };
  } catch (error: any) {
    return {
      error: { data: error.response.data, status: error.response.status },
    };
  }
}

export { signUpService, signInService };

// Maybe not able to serialize
// Only can return things that are "serializable"
// Meaning No Errors, Only Objects/Arrays/Primitives
// Otherwise it'll show 500

//Me:-> and returning a custom error messages were coausing the trouble of 500 ?
// there is no concept of HTTP statuses in case of server functions Just Objects and Values that's it.
// If you can return an object that can be serialized, you're good to go
// Just encode your error message in the payload (return value)

// return the messages based on conditions (if that's what you'd like to do.)
// Serialization failed == 500 Error

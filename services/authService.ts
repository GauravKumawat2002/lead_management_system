"use server";
import {
  ConfirmResetPasswordSchemaType,
  SignInForm,
  SignUpForm,
} from "@/schemas/auth-form-schema";
import httpClient from "./httpClient";
import { cookies } from "next/headers";

interface SignInResponse {
  jwtToken: string;
  refreshToken: string;
  reference: string;
}
type ISignInResponse =
  | { data: SignInResponse }
  | { error: { data: "IDFK"; status: number } };

interface RefreshTokenResponse {
  jwtToken: string;
}
interface RefreshTokenError {
  data: string;
  status: number;
}

type IRefreshTokenResponse = RefreshTokenResponse | RefreshTokenError;

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

async function verifyAccountService(token: string) {
  try {
    const response = await httpClient.post("auth/verify-user", null, {
      params: { token },
    });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}

async function signInService(data: SignInForm): Promise<ISignInResponse> {
  try {
    const response = await httpClient.post("/auth/signin", data);
    return { data: response.data };
  } catch (error: any) {
    return {
      error: { data: error.response.data, status: error.response.status },
    };
  }
}

async function refreshTokenService(): Promise<IRefreshTokenResponse> {
  try {
    const cookieStore = cookies();
    const response = await httpClient.post("/auth/refresh-token", null, {
      headers: {
        Authorization: `Bearer ${cookieStore.get("refreshToken")?.value}`,
      },
    });
    return { jwtToken: response.data.jwtToken };
  } catch (error: any) {
    return {
      data: error.response.data,
      status: error.response.status,
    };
  }
}
async function requestResetPasswordService(email: string) {
  try {
    const response = await httpClient.post("/auth/reset-password/request", {
      email,
    });
    return { data: response.data, status: response.status };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}

async function confirmResetPasswordService(
  data: Omit<ConfirmResetPasswordSchemaType, "confirmNewPassword">,
  token: string,
) {
  try {
    const response = await httpClient.post(
      "/auth/reset-password/confirm",
      {
        password: data.newPassword,
      },
      { params: { token } },
    );

    return { data: response.data, status: response.status };
  } catch (error: any) {
    return { data: error.response.data, status: error.response.status };
  }
}

async function logOutService() {
  try {
    const cookieStore = cookies();
    const response = await httpClient.post("/auth/logout", null, {
      headers: {
        Authorization: `Bearer ${cookieStore.get("jwtToken")?.value}`,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error: any) {
    return { data: error.response.data, status: error.response };
  }
}

export {
  signUpService,
  verifyAccountService,
  signInService,
  refreshTokenService,
  requestResetPasswordService,
  confirmResetPasswordService,
  logOutService,
};

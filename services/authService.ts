import { SignInForm, SignUpForm } from "@/schemas/auth-form-schema";
import httpClient from "./httpClient";

interface SignUpResponse {
  message: string;
}

interface SignInResponse {
  jwtToken: string;
  reference: string;
}
async function signUpService(
  data: Omit<SignUpForm, "confirmPassword">,
): Promise<SignUpResponse> {
  try {
    const response = await httpClient.post("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    // Improve error handling to cover cases where error.response might be undefined
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
}
async function signInService(data: SignInForm): Promise<SignInResponse> {
  try {
    const response = await httpClient.post("/auth/signin", data);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error);
    }
  }
}

export { signUpService, signInService };

// signInService will take a SignInForm as an argument and return a Promise that resolves to a SignInResponse object. The function will make a POST request to the /auth/signin endpoint with the form data. If the request is successful, the function will return a jwt token in the response body which will be look like this ->
//{
//    "jwtToken": "eyJhbGciOiJIUzI1NiJ9.      eyJzdWIiOiJnYXVyYXZrdW1hd2F0MTlzZXAyMDAyQGdtYWlsLmNvbSIsImlhdCI6MTczMTY1NTM0OCwiZXhwIjoxNzMxNzQxNzQ4fQ.J4OVcAjU4c4WxoFQ0s_F13PLEaflYXaYcE5b94kZvYg",
//    "reference": "gauravkumawat19sep2002@gmail.com"
// }
// If the request fails, the function will throw an error with the message from the response body. If the error does not have a response or message, a generic error message will be thrown.

// You can store the JWT token in localStorage or sessionStorage.
// Here is an example of how you can modify the signInService function to store the token in localStorage:

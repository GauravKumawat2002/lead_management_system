import { ROUTES } from "@/routes/routes";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: ROUTES.HOME });
export function storeToken(token: string) {
  cookies.set("jwtToken", token);
}
export function getToken(): string | null {
  return cookies.get("jwtToken");
}
export function removeToken() {
  return cookies.remove("jwtToken");
}

import { ROUTES } from "@/routes/routes";
import Cookies from "universal-cookie";
const cookies = new Cookies(null, { path: ROUTES.HOME });
function setTokenCookie(
  tokenName: string,
  tokenValue: string,
  remainingTime: number,
) {
  cookies.set(tokenName, tokenValue, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
    maxAge: remainingTime,
  });
}
function getToken(tokenName: string) {
  return cookies.get(tokenName);
}
function removeToken(tokenName: string) {
  return cookies.remove(tokenName);
}
function extractTokenExpirationTime(jwtToken: string) {
  const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
  const decodedTokenExpiry = decodedToken.exp * 1000;
  const remainingTimeToken = Math.floor(
    (decodedTokenExpiry - Date.now()) / 1000,
  );
  return remainingTimeToken;
}
export { setTokenCookie, getToken, removeToken, extractTokenExpirationTime };

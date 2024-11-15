export function storeToken(token: string) {
  localStorage.setItem("jwtToken", token);
}
export function getToken(): string | null {
  return localStorage.getItem("jwtToken");
}
export function removeToken() {
  localStorage.removeItem("jwtToken");
}

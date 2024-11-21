import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getErrorMessage(
  errorData: string,
  errorMessages: { [key: string]: string },
): string {
  const errorMessageKey = Object.keys(errorMessages).find((key) =>
    errorData.includes(key),
  );
  return errorMessageKey ? errorMessages[errorMessageKey] : errorData;
}

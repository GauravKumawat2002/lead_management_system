import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Lead Management System",
  description: "A lead management system for travel agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen items-center justify-center !p-5 !pt-3 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

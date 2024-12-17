"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/custom/shared/side-bar";
import Navbar from "@/components/custom/shared/nav-bar";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider defaultOpen={false}>
          <Sidebar />
          <main className="w-full">
            <Navbar className="sticky top-0 mb-4" />
            <QueryClientProvider client={queryClient}>
              <ReactQueryDevtools />
              {children}
            </QueryClientProvider>
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

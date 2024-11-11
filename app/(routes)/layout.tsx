import { SidebarProvider } from "@/components/ui/sidebar";
import Sidebar from "@/components/custom/shared/side-bar";
import Navbar from "@/components/custom/shared/nav-bar";
import { ThemeProvider } from "next-themes";

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
        <SidebarProvider>
          <Sidebar />
          <main>
            <Navbar className="sticky top-0 mb-4" />
            {children}
          </main>
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

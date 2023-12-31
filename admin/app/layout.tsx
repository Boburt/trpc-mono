import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@components/theme-provider";
import { NavigationMenuDemo } from "@components/layout/main-nav";
import { Search } from "lucide-react";
import { UserNav } from "@components/layout/user-nav";
import { ModeToggle } from "@components/layout/mode-toggle";
import { Toaster } from "sonner";
import { Providers } from "@admin/store/provider";
import SessionLocalProvider from "@admin/store/session-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("davr");
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <SessionLocalProvider>
          <Providers>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="flex-col">
                <div className="border-b">
                  <div className="flex h-16 items-center px-4">
                    <NavigationMenuDemo />
                    <div className="ml-auto flex items-center space-x-4">
                      <Search />
                      <UserNav />
                      <ModeToggle />
                    </div>
                  </div>
                </div>
                <div className="mx-4 mt-10 mb-4">{children}</div>
              </div>
              <Toaster richColors />
            </ThemeProvider>
          </Providers>
        </SessionLocalProvider>
      </body>
    </html>
  );
}

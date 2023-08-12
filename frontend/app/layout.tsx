import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@components/theme-provider";
import { NavigationMenuDemo } from "@frontend/components/layout/main-nav";
import { Search } from "lucide-react";
import { UserNav } from "@frontend/components/layout/user-nav";
import { ModeToggle } from "@frontend/components/layout/mode-toggle";
import { Toaster } from "@components/ui/toaster";
import { Providers } from "@frontend/store/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
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
            <Toaster />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Roboto } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Container from "./(main)/layout/Container";
import Header from "./(main)/layout/Header";
import Footer from "./(main)/layout/Footer";
import dynamic from "next/dynamic";
import { BreadCrumbs } from "../components/breadcrumbs/breadcrumbs";
import { auth } from "@frontend_next/auth";
import SessionProvider from "@frontend_next/components/providers/SessionProvider";
import ReactQueryClientProvider from "@frontend_next/components/providers/ReactQueryProvider";
import { ProductSelectionSummary } from "./catalog/product-selection-summary";

const robotoSans = Roboto({
  weight: "400",
  subsets: ["latin-ext", "cyrillic-ext", "cyrillic"],
  variable: "--font-roboto-sans",
});
const robotoMono = Roboto({
  weight: "700",
  subsets: ["latin-ext", "cyrillic-ext", "cyrillic"],
  variable: "--font-roboto-roboto",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const NextUIProviderClient = dynamic(
  () => import("@nextui-org/system").then((mod) => mod.NextUIProvider),
  {
    ssr: false,
  }
);

const NextThemesProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  }
);

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${robotoSans.variable} ${robotoMono.variable}`}
    >
      <body className={` bg-white dark:bg-slate-900 `}>
        <NextThemesProvider attribute="class">
          <SessionProvider session={session}>
            <ReactQueryClientProvider>
              <NextUIProviderClient className="flex flex-col min-h-screen">
                <Header />
                <main className="pb-4 shrink-0">
                  {/* {title && pathname != "/" && (
            <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">
              {title}
            </h1>
          )} */}
                  {/* {pathname !== "/" && disableBreadcrumbs == false && (
            <Breadcrumbs
              indexText="Главная"
              mainBemClass="breadcrumbs"
              crumbs={customCrumbs}
            />
          )} */}
                  <Container>{children}</Container>
                </main>
                <Footer />
                <Toaster richColors />
                <ProductSelectionSummary />
              </NextUIProviderClient>
            </ReactQueryClientProvider>
          </SessionProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}

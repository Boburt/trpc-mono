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
import { BreadCrumbs } from "@frontend_next/components/breadcrumbs/breadcrumbs";
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
  title: {
    default: "Портал легкой промышленности",
    template: "%s | Портал легкой промышленности",
  },
  description:
    "Портал легкой промышленности - это передовая B2B платформа электронной коммерции, специализирующаяся на высококачественном текстиле и тканях. Соединяя производителей, оптовиков и розничных продавцов по всему миру, наша площадка предлагает широкий ассортимент продукции, включая натуральные и синтетические ткани, экологически чистые материалы и инновационные текстильные решения. Благодаря расширенным возможностям поиска, безопасным транзакциям и удобному интерфейсу, ТекстильТорг оптимизирует процесс глобальной торговли текстилем, позволяя предприятиям эффективно находить, сравнивать и приобретать текстильные изделия. Независимо от того, ищете ли вы традиционный хлопок, экологически чистые бамбуковые ткани или новейшие технические текстильные материалы, Портал легкой промышленности - ваш универсальный ресурс для всех текстильных потребностей.",
  keywords: [
    "текстильная электронная коммерция",
    "B2B площадка тканей",
    "оптовый текстиль",
    "экологичные ткани",
    "глобальная торговля текстилем",
    "производители текстиля",
    "поставщики тканей",
    "платформа текстильной промышленности",
    "оптовая закупка тканей",
    "поиск текстиля",
  ],
  authors: [{ name: "Denis Khan" }],
  creator: "Davron Yuldashov & friends",
  publisher: "Davron Yuldashov",
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
  // const pathname = usePathname();
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

                  <Container>
                    <BreadCrumbs>{children}</BreadCrumbs>
                  </Container>
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

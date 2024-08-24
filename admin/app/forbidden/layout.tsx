
import { Inter } from "next/font/google";
import { Providers } from "@admin/store/provider";
const inter = Inter({ subsets: ["latin"] });

export default function ForbiddenLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <Providers>
                    <div className="bg-fuchsia-800 h-[100dvh] flex items-center justify-around w-full">
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    )
}
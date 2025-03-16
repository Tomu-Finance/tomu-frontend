import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../styles/main.scss"
import "../styles/pages/AppLayout.scss"
import Providers from "@/providers"
import Sidebar from "@/components/Sidebar"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: false,
  style: ["normal"],
})

export const metadata: Metadata = {
  title: "Tomu",
  description:
    "Unified wallet with support for offramping/onramping operations.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="appLayout">
        <Providers>
          <Sidebar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

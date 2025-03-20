"use client";

import Providers from "@/providers"
import { Inter } from "next/font/google";
import "../styles/main.scss";
import "../styles/pages/AppLayout.scss";
import Sidebar from "@/components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { defaultChain, supportedChains } from "@/utils/constants/chaints";
import { WagmiProvider } from "@privy-io/wagmi";
import { config } from "@/utils/config";
import { BiconomyProvider } from "@biconomy/use-aa";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  adjustFontFallback: false,
  style: ["normal"],
})

// export const metadata: Metadata = {
//   title: "Tomu",
//   description:
//     "Unified wallet with support for offramping/onramping operations.",
// }

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const biconomyPaymasterApiKey =
    process.env.NEXT_PUBLIC_PAYMASTER_API_KEY || "";
  const bundlerUrl = process.env.NEXT_PUBLIC_BUNDLER_URL || "";

  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <body className="appLayout">
        <PrivyProvider
          appId="cm4a26151033rni6zss9qxp6v"
          config={{
            // Create embedded wallets for users who don't have a wallet
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            defaultChain,
            supportedChains,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <WagmiProvider config={config}>
              <BiconomyProvider
                config={{
                  biconomyPaymasterApiKey,
                  bundlerUrl,
                }}
                queryClient={queryClient}
              >
                <Providers>
                  <Sidebar />
                  {children}
                </Providers>
              </BiconomyProvider>
            </WagmiProvider>
          </QueryClientProvider>
        </PrivyProvider>
      </body>
    </html>
  )
}

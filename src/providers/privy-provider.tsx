"use client"

import { PrivyProvider } from "@privy-io/react-auth"

const TomuPrivyProvider = ({ children }: { children: React.ReactNode }) => {
  const privyAppId = process.env.NEXT_PUBLIC_PRIVY_APP_ID

  if (!privyAppId) {
    throw new Error("Privy App ID is required")
  }

  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        appearance: {
          theme: "light",
          accentColor: "#FFFFFF",
          logo: '/logo.svg',
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
      }}
    >
      {children}
    </PrivyProvider>
  )
}

export default TomuPrivyProvider

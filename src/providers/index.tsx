"use client"

import React from "react"
import TomuPrivyProvider from "./privy-provider"
import ToastProvider from "@/components/toast/ToastProvider"

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <TomuPrivyProvider>
      <ToastProvider>{children}</ToastProvider>
    </TomuPrivyProvider>
  )
}

export default Providers

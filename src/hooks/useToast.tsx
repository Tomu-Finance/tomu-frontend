"use client"

import { useContext } from "react"
import { ToastContext } from "@/components/toast/ToastProvider"

const useToast = () => {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error("useToast must be used within Toast Provider")
  }

  return context
}

export { useToast }

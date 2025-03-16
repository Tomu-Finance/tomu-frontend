"use client"

import React, { useMemo, useState, useCallback, createContext } from "react"
import { Toaster } from "../Toaster"

export type ToastVariants = "success" | "error" | "default"

export interface ToastMessage {
  message: string
  description?: string
  variant?: ToastVariants
}

export interface ToastOptions {
  duration?: number
}

interface ToastContextProps {
  open: boolean
  toast: (options: ToastMessage) => void
  toastValue: ToastMessage
  toastOptions: (options: ToastOptions) => void
}

const delay = (ms: number = 3500) =>
  new Promise((resolve) => setTimeout(resolve, ms))

export const ToastContext = createContext<ToastContextProps | undefined>(
  undefined
)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState<ToastMessage>({
    message: "",
    description: undefined,
    variant: "default",
  })
  const [toastOptions, setToastOptions] = useState<ToastOptions>({
    duration: 3500,
  })

  const triggerToast = useCallback(
    async (options: ToastMessage) => {
      if (open) return

      setToast(options)
      setOpen(true)
      await delay(toastOptions.duration)
      setOpen(false)
      await delay(600)
      setToast({
        message: "",
        description: undefined,
        variant: "default",
      })
    },
    [open, toastOptions.duration]
  )

  const contextValue: ToastContextProps = useMemo(
    () => ({
      open,
      toast: triggerToast,
      toastValue: toast,
      toastOptions: setToastOptions,
    }),
    [open, toast, triggerToast, setToastOptions]
  )

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

export default ToastProvider

"use client"

import { useToast } from "@/hooks/useToast"
import { ToastPortal } from "./toast/ToastPortal"
import ToastMessage from "./toast/ToastMessage"

const Toaster = () => {
  const { open, toastValue } = useToast()

  return (
    <ToastPortal>
      <ToastMessage open={open} {...toastValue} />
    </ToastPortal>
  )
}

export { Toaster }

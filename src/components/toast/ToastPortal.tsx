"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

const ToastPortal = ({ children }: { children: React.ReactNode }) => {
  const [_mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  return _mounted
    ? createPortal(
        <div style={{ position: "fixed", top: 0, right: 0, zIndex: 1000 }}>
          {children}
        </div>,
        document.body
      )
    : null
}

export { ToastPortal }

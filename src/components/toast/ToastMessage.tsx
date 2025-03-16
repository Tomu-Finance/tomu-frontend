"use client"

import { motion } from "motion/react"
import { type ToastMessage, ToastVariants } from "./ToastProvider"

const styles: Record<
  ToastVariants,
  { backgroundColor: string; textColor: string }
> = {
  success: {
    backgroundColor: "#10b981",
    textColor: "white",
  },
  error: {
    backgroundColor: "#ef4444",
    textColor: "white",
  },
  default: {
    backgroundColor: "white",
    textColor: "black",
  },
}

type ToastMessageProps = ToastMessage & {
  open: boolean
}

const ToastMessage = ({
  open,
  message,
  description,
  variant,
}: ToastMessageProps) => {
  return (
    <motion.div
      initial={{
        position: "absolute",
        width: "fit-content",
        minWidth: "250px",
        height: "fit-content",
        y: "4vh",
        x: "0",
        padding: "1rem",
        borderRadius: "6px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
      animate={{ x: open ? "-110%" : "0%" }}
      transition={{ duration: 0.4, ease: "anticipate" }}
      style={{
        width: "500px",
        height: "500px",
        backgroundColor: styles[variant || "default"].backgroundColor,
      }}
    >
      <p style={{ color: styles[variant || "default"].textColor }}>{message}</p>
      {description && (
        <p style={{ color: styles[variant || "default"].textColor }}>
          {description}
        </p>
      )}
    </motion.div>
  )
}

export default ToastMessage

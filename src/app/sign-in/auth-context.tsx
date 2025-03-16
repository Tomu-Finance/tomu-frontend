"use client"

import React, { createContext, useMemo, useState } from "react"

export type AuthViewType = "sign-in" | "enter-code"

interface AuthContextProps {
  view: AuthViewType
  setView: (view: AuthViewType) => void

  email: string
  setEmail: (email: string) => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [view, setView] = useState<AuthViewType>("sign-in")
  const [email, setEmail] = useState<string>("")

  const contextValue = useMemo(
    () => ({
      view,
      setView,
      email,
      setEmail,
    }),
    [view, setView]
  )

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const context = React.useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthContextProvider")
  }

  return context
}

export { AuthContextProvider, useAuthContext }

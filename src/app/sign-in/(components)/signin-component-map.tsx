"use client"

import EnterEmail from "./enter-email"
import EnterCode from "./verify-code"
import { AuthViewType, useAuthContext } from "../auth-context"

const AuthViewComponents: Record<AuthViewType, JSX.Element> = {
  "sign-in": <EnterEmail />,
  "enter-code": <EnterCode />,
}

const AuthViewRenderer = () => {
  const { view } = useAuthContext()

  return <>{AuthViewComponents[view]}</>
}

export default AuthViewRenderer

import { AuthContextProvider } from "./auth-context"

export default function SignInLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <AuthContextProvider>{children}</AuthContextProvider>
}

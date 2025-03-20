import Header from "@/components/Header"
import { Fragment } from "react"

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Fragment>
      <Header />
      <main className="appLayout__main">{children}</main>
    </Fragment>
  )
}

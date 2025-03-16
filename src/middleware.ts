import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

const privateRoutes = ["/", "/deposit", "/explore", "/withdraw"]

export default async function middleware(req: NextRequest) {
  const { pathname, origin } = req.nextUrl

  const cookieAuthToken = req.cookies.get("privy-token")

  if (!cookieAuthToken) {
    if (privateRoutes.includes(pathname))
      return NextResponse.redirect(new URL("/sign-in", origin))

    return NextResponse.next()
  } else {
    if (pathname === "/sign-in")
      return NextResponse.redirect(new URL("/", origin))
    return NextResponse.next()
  }
}

export const config = {
  matcher: ["/:path*"],
}

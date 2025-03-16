import { Metadata } from "next"
import "../../styles/pages/SignIn.scss"
import Image from "next/image"
import TomuLogo from "../../assets/svgs/logo.svg"
import AuthViewRenderer from "./(components)/signin-component-map"

export const metadata: Metadata = {
  title: "Sign In | Tomu",
}

export default function SignInPage() {
  return (
    <div className="signInPage">
      <div>
        <div className="signInPage__box">
          <div className="signInPage__box__logo">
            <Image src={TomuLogo} alt="Tomu logo" width={90} sizes="100vw" />
          </div>

          <AuthViewRenderer />
        </div>
      </div>
    </div>
  )
}

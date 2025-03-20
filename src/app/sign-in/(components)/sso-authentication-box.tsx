"use client"

import Image from "next/image"
import { useToast } from "@/hooks/useToast"
import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth"
import WalletIcon from "../../../assets/svgs/wallet.svg"
import GoogleIcon from "../../../assets/svgs/google.svg"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const SsoAuthenticationBox = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { initOAuth } = useLoginWithOAuth()
  const { ready, connectWallet, authenticated } = usePrivy()

  const disableLogin = !ready || (ready && authenticated)

  useEffect(() => {
    if (authenticated) {
      toast({
        message: "Authenticated",
        variant: "success",
      })
      router.replace("/")
    }
  }, [authenticated])

  const handleInitOAuth = async () => {
    try {
      await initOAuth({ provider: "google" })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      toast({
        message: "Error signing in. Please try again.",
      })
    }
  }

  return (
    <div className="signInPage__box__form__sso__actions__box__buttons">
      <button
        id="login-with-google"
        type="button"
        onClick={handleInitOAuth}
        disabled={disableLogin}
      >
        <Image
          src={GoogleIcon}
          alt="Log in with Google"
          width={23}
          height={23}
          sizes="100vw"
        />
        Sign in with Google
      </button>
      <button
        id="connect-wallet"
        type="button"
        onClick={connectWallet}
        disabled={disableLogin}
      >
        <Image
          src={WalletIcon}
          alt="Connect wallet"
          width={23}
          height={23}
          sizes="100vw"
        />
        Connect wallet
      </button>
    </div>
  )
}

export default SsoAuthenticationBox

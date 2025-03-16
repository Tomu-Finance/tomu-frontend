"use client"

import * as z from "zod"

import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/useToast"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginWithEmail } from "@privy-io/react-auth"
import { Divider } from "../../../components/divider"
import { useAuthContext } from "../auth-context"

const formSchema = z.object({
  code: z.string().length(6, { message: "Required" }),
})

type VerifyCodeFormValues = z.infer<typeof formSchema>

const VerifyCode = () => {
  const router = useRouter()
  const { toast } = useToast()
  const { email, setEmail, setView } = useAuthContext()
  const { loginWithCode, sendCode } = useLoginWithEmail()

  const { register, handleSubmit } = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  })

  const handleResendCode = () => {
    try {
      sendCode({ email }).then(() => {
        toast({
          message: `Code has been sent.`,
          variant: "success",
        })
      })
    } catch (error) {
      toast({
        message: "Error signing in. Please try again.",
        variant: "error",
      })
    }
  }

  const handleFormReset = () => {
    setEmail("")
    setView("sign-in")
  }

  const onSubmit = ({ code }: VerifyCodeFormValues) => {
    try {
      loginWithCode({ code: String(code) })
        .then(() => {
          toast({
            message: "Authenticated",
            variant: "success",
          })
          router.replace("/")
        })
        .catch((error) => {
          toast({
            message: "Uh oh! Invalid Code",
            variant: "error",
          })
        })
    } catch (error) {
      toast({
        message: "Error signing in. Please try again.",
        variant: "error",
      })
    }
  }

  return (
    <>
      <div className="signInPage__box__heading">
        <h2>Verify your email</h2>
        <p>
          We&rsquo;ve sent a 6-digit code to your email. Please enter <br /> it
          below to verify your account.
        </p>
      </div>

      <div className="signInPage__box__form">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="signInPage__box__form__container"
        >
          <p className="signInPage__box__form__container__signIn__text">
            Enter the code sent to your email
          </p>
          <div className="signInPage__box__form__container__form__control">
            <input
              id="code"
              required
              maxLength={6}
              type="password"
              placeholder="******"
              {...register("code")}
            />
            <button
              className="submitCodeButton"
              id="submit-to-verify-code"
              type="submit"
            >
              Verify
            </button>
          </div>
        </form>

        <div className="signInPage__box__form__more__options">
          <div className="signInPage__box__form__more__options__row">
            <p>Didn&rsquo;t receive the code?</p>
            <button type="button" onClick={handleResendCode}>
              Resend
            </button>
          </div>

          <Divider />

          <div className="signInPage__box__form__more__options__row">
            <p>Entered the wrong email?</p>
            <button type="button" onClick={handleFormReset}>
              Change Email
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default VerifyCode

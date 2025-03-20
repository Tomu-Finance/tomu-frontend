/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { useToast } from "@/hooks/useToast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLoginWithEmail } from "@privy-io/react-auth"
import { useAuthContext } from "../auth-context"

const formSchema = z.object({
  email: z.string().email({ message: "Required" }),
})

type SignUpFormValues = z.infer<typeof formSchema>

const SignUpForm = () => {
  const { toast } = useToast()
  const { setView, setEmail } = useAuthContext()
  const { register, handleSubmit } = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  const { sendCode } = useLoginWithEmail()

  const onSubmit = ({ email }: SignUpFormValues) => {
    try {
      sendCode({ email }).then(() => {
        toast({
          message: `Code has been sent.`,
          variant: "success",
        })
        setEmail(email)
        setView("enter-code")
      })
    } catch (error) {
      toast({
        message: "Error signing in. Please try again.",
        variant: "error",
      })
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="signInPage__box__form__container"
    >
      <p className="signInPage__box__form__container__signIn__text">
        Sign in with:
      </p>
      <div className="signInPage__box__form__container__form__control">
        <input
          id="email"
          required
          type="text"
          placeholder="Email"
          {...register("email")}
        />
        <button
          className="submitEmailButton"
          id="submit-to-get-code"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default SignUpForm

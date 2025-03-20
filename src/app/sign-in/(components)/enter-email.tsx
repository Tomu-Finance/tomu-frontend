import SignUpForm from "./signup-form"
import { DividerWithOr } from "../../../components/divider"
import SsoAuthenticationBox from "./sso-authentication-box"

const EnterEmail = () => {
  return (
    <>
      <div className="signInPage__box__heading">
        <h2>Welcome to Tomu</h2>
        <p>It&rsquo;s time to go deep into diverse onchain experiences</p>
      </div>

      <div className="signInPage__box__form">
        <SignUpForm />
        <div className="signInPage__box__form__sso__actions__box">
          <DividerWithOr />
          <SsoAuthenticationBox />
        </div>
      </div>
    </>
  )
}

export default EnterEmail

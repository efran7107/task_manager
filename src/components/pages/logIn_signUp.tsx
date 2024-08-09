import { LogInForm } from "../forms/logInForm";
import "../../styles/entryPage.css";
import { SignUpForm } from "../forms/signUpForm";

export const LogInSignUp = () => {
  return (
    <div className="entry-forms">
      <LogInForm />
      <SignUpForm />
    </div>
  );
};

import { useLogIn } from "../functions/providersContext";
import { UserSignIn } from "./log-in-components/log-in-component";
import "../css/UserLogIn.css";
import { UserSignUp } from "./log-in-components/sign-up-component";

export const UserLogIn = () => {
  const { logIn, setLogIn, signUp, setSignUp, resetInfo, signUserIn } = useLogIn();

  return (
    <div className="user-log-in">
      <div 
        className="log-in-container"
        onClick={() => resetInfo('log-in')}
      >
        <h3>Sign In</h3>
        <UserSignIn logIn={logIn} setLogIn={setLogIn} />
      </div>
      <div 
        className="sign-up-container"
        onClick={() => resetInfo('sign-up')}
      >
        <h3>Sign Up</h3>
        <UserSignUp signUp={signUp} setSignUp={setSignUp}/>
      </div>
      <input 
        className="submit-btn"
        type="button" 
        value="Sign In"
        onClick={signUserIn}
      />
    </div>
  );
};

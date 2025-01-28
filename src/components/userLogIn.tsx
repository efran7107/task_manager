import { useLogIn } from "../functions/providersContext";
import { UserSignIn } from "./log-in-components/log-in-component";
import "../css/UserLogIn.css";

export const UserLogIn = () => {
  const { logIn, setLogIn, resetInfo } = useLogIn();

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
        onClick={() => resetInfo('log-in')}
      >
        <h3>Sign Up</h3>
        
      </div>
    </div>
  );
};

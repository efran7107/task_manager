import { ReactNode, useState } from "react";
import { LogInProviderContext } from "../../functions/providersContext";
import { LogInInput, SignUpInput, tgroup } from "../../types/logInProviderTypes";

const defaultLogInInfo: LogInInput = {
  username: '',
  password: ''
}

const defaultSignUpInput: SignUpInput = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirm: '',
}

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const [signIn, setSignIn] = useState<tgroup>('log-in');
  const [logIn, setLogIn] = useState(defaultLogInInfo);
  const [signUp, setSignUp] = useState(defaultSignUpInput);

  const resetInfo = (group: tgroup) => {
    switch(group){
      case 'log-in':
        setSignUp(defaultSignUpInput);
        break;
      case 'sign-up':
        setLogIn(defaultLogInInfo);
        break;
    }
    setSignIn(group)
  }

  return (
    <LogInProviderContext.Provider
      value={{
        logIn,
        setLogIn,
        signUp,
        setSignUp,
        resetInfo
      }}
    >
      {children}
    </LogInProviderContext.Provider>
  );
};

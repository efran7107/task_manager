import { ReactNode, useState } from "react";
import { LogInProviderContext } from "../../functions/providersContext";
import {
  LogInInput,
  SignUpInput,
  tgroup,
} from "../../types/logInProviderTypes";
import { TteamMember, TuserAuth } from "../../types/globalTypes";
import { apiOptions } from "../../api";
import toast from "react-hot-toast";

const defaultLogInInfo: LogInInput = {
  username: "",
  password: "",
};

const defaultSignUpInput: SignUpInput = {
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirm: "",
};

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const [signIn, setSignIn] = useState<tgroup>("log-in");
  const [logIn, setLogIn] = useState(defaultLogInInfo);
  const [signUp, setSignUp] = useState(defaultSignUpInput);

  const resetInfo = (group: tgroup) => {
    switch (group) {
      case "log-in":
        setSignUp(defaultSignUpInput);
        break;
      case "sign-up":
        setLogIn(defaultLogInInfo);
        break;
    }
    setSignIn(group);
  };

  const storeUser = (username: string) => {
    localStorage.setItem("username" , username)
  }

  const logUserIn = async (setIsLoggedIn: (isLoggedIn: boolean) => void) => {
    const user: TteamMember | undefined = await apiOptions.getRequests.getUsername(
      logIn.username
    ); 
    if(user === undefined){
      toast.error('Sorry, username and/or password is incorrect.')
      setLogIn(defaultLogInInfo)
    }else{
      const userId = user.id;
      const userAuth: TuserAuth = await apiOptions.getRequests.getUserAuth(userId)
      const password = userAuth.password
      switch(password === logIn.password){
        case true:
          storeUser(user.username);
          setIsLoggedIn(true);
          break;
        case false:
          setLogIn(defaultLogInInfo)
          toast.error('Sorry, username and/or password is incorrect.');
          break;
      }
    }
  
  };

  const signUserIn = (setIsLoggedIn: (isLoggedIn: boolean) => void) => {
    switch (signIn) {
      case "log-in":
        logUserIn(setIsLoggedIn);
        break;
    }
    return true;
  };

  return (
    <LogInProviderContext.Provider
      value={{
        logIn,
        setLogIn,
        signUp,
        setSignUp,
        resetInfo,
        signUserIn,
      }}
    >
      {children}
    </LogInProviderContext.Provider>
  );
};

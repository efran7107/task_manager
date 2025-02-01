import { ReactNode, useEffect, useState } from "react";
import { LogInProviderContext } from "../../functions/providersContext";
import {
  LogInInput,
  SignUpInput,
  tgroup,
} from "../../types/logInProviderTypes";
import { TPage, TTeamMember, TUserAuth } from "../../types/globalTypes";
import { apiOptions } from "../../api";
import toast from "react-hot-toast";
import { isEmail, isMatch, isName } from "../../functions/validations";
import { addUser } from "../../functions/apiFunctions";

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

export const LogInProvider = ({ children, setPage }: { children: ReactNode, setPage: (page: TPage) => void }) => {
  const [signIn, setSignIn] = useState<tgroup>("log-in");
  const [logIn, setLogIn] = useState(defaultLogInInfo);
  const [signUp, setSignUp] = useState(defaultSignUpInput);
  const [users, setUsers] = useState<TTeamMember[]>([])

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

  const logUserIn = async () => {
    setPage('loading')
    const user: TTeamMember | undefined = await apiOptions.getRequests.getSingleData('teamMembers', 'username', logIn.username)
    if(user === undefined){
      toast.error('Sorry, username and/or password is incorrect.')
      setLogIn(defaultLogInInfo)
    }else{
      const userId = user.id;
      const userAuth: TUserAuth = await apiOptions.getRequests.getSingleData('userAuths', 'userId', userId)
      const password = userAuth.password
      switch(password === logIn.password){
        case true:
          storeUser(user.username);
          setPage('home-page');
          break;
        case false:
          setLogIn(defaultLogInInfo)
          toast.error('Sorry, username and/or password is incorrect.');
          setPage('log-in')
          break;
      }
    }
  };

  const signUserUp = () => {
    setPage('loading')
    for(const [key, value] of Object.entries(signUp)){
      switch(key){
        case 'username' : 
          if(users.find(user => user.username === value)){
            toast.error("Please fill out the form to create an account.")
            setPage('log-in')
            return
          }
          break;
        case 'email':
          if(!isEmail(value)){
            toast.error("Please fill out the form to create an account.")
            setPage('log-in')
            return
          }
          break;
        case 'password':
          if(!isMatch(value, signUp.confirm)){
            toast.error("Please fill out the form to create an account.")
            setPage('log-in')
            return
          }
          break;
        case 'confirm':
          break;
        default: 
          if(!isName(value)){
            toast.error("Please fill out the form to create an account.")
            setPage('log-in')
            return
          }
          break;
      }
    }
    addUser(
      signUp,
    ).finally(() => {
      localStorage.setItem('username', signUp.username)
      setPage('create/join-team')
    }).catch(() =>{
      toast.error('sorry, an error occured')
    })

  }

  const signUserIn = () => {
    switch (signIn) {
      case "log-in":
        logUserIn();
        break;
      case 'sign-up': 
        signUserUp()
    }
    return true;
  };

  useEffect(() => {
    apiOptions
      .getRequests
      .getDataInfo('teamMembers')
      .then((users) => setUsers(users))
  },[])

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

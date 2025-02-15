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
import { sendError } from "../../functions/functions.ts";

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

export const LogInProvider = ({
  children,
  setPage,
    setIsLoading
}: {
  children: ReactNode;
  setPage: (page: TPage) => void;
  setIsLoading: (isLoading: boolean) => void
}) => {
  const [signIn, setSignIn] = useState<tgroup>("log-in");
  const [logIn, setLogIn] = useState(defaultLogInInfo);
  const [signUp, setSignUp] = useState(defaultSignUpInput);
  const [users, setUsers] = useState<TTeamMember[]>([]);

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
    localStorage.setItem("username", username);
  };

  const logUserIn = async () => {
    setIsLoading(true);
    const user: TTeamMember | undefined =
      await apiOptions.getRequests.getSingleData(
        "teamMembers",
        "username",
        logIn.username
      );
    if (user === undefined) {
      toast.error("Sorry, username and/or password is incorrect.");
      setLogIn(defaultLogInInfo);
      setIsLoading(false)
      setPage("log-in");
    } else {
      const userId = user.id;
      const userAuth: TUserAuth = await apiOptions.getRequests.getSingleData(
        "userAuths",
        "userId",
        userId
      );
      const password = userAuth.password;

      switch (password === logIn.password) {
        case true:
          storeUser(user.username);
          setIsLoading(false)
          setPage("home-page");
          break;
        case false:
          setLogIn(defaultLogInInfo);
          toast.error("Sorry, username and/or password is incorrect.");
          setIsLoading(false)
          setPage("log-in");
          break;
      }
    }
  };

  const signUserUp = () => {
    setIsLoading(true)
    for (const [key, value] of Object.entries(signUp)) {
      switch (key) {
        case "username":
          if (
            users.find((user) => user.username === value) ||
            value.trim().length < 2
          ) {
            sendError(setPage);
          }
          break;
        case "email":
          if (!isEmail(value)) {
            sendError(setPage);
            return;
          }
          break;
        case "password":
          if (!isMatch(value, signUp.confirm)) {
            sendError(setPage);
            return;
          }
          break;
        case "confirm":
          break;
        default:
          if (!isName(value)) {
            toast.error("Please fill out the form to create an account.");
            setIsLoading(false)
            setPage("log-in");
            return;
          }
          break;
      }
    }
    addUser(signUp)
      .finally(() => {
        localStorage.setItem("username", signUp.username);
        setIsLoading(false)
        setPage("create_join-team");
      })
      .catch(() => {
        toast.error("sorry, an error occured");
      });
  };

  const signUserIn = () => {
    switch (signIn) {
      case "log-in":
        logUserIn();
        break;
      case "sign-up":
        signUserUp();
    }
    return true;
  };

  useEffect(() => {
    apiOptions.getRequests
      .getDataInfo("teamMembers")
      .then((users) => setUsers(users))
      .catch(() => {
        toast.error("sorry, an error occured");
        setIsLoading(true)
      });
  }, [setIsLoading]);

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

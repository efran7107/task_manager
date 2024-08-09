import { useState } from "react";
import { ErrorPopUp, UserInput } from "../inputs/formInputs";
import {
  defaultLogIn,
  invalidUsernamePassword,
  logInError,
} from "../../functions/defaultStates";
import { validations } from "../../functions/validations";
import toast from "react-hot-toast";
import { useLogIn } from "../../functions/providersContext";

export const LogInForm = () => {
  const [logIn, setLogIn] = useState(defaultLogIn);
  const [isFirstLogIn, setIsFirstLogIn] = useState(true);
  const { username, password } = logIn;
  const { logInUser } = useLogIn();

  return (
    <div className="log-in">
      <h2>Log In</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validations.isValidLogIn(logIn) === false) {
            toast.error(logInError);
            setIsFirstLogIn(false);
            return;
          }
          logInUser(logIn).then((res) => {
            if (res) {
              toast.success("Log in successful");
              setIsFirstLogIn(true);
              setLogIn(defaultLogIn);
              return;
            }
            toast.error(invalidUsernamePassword);
            setIsFirstLogIn(false);
            setLogIn(defaultLogIn);
          });
        }}
        className="inputs"
      >
        <UserInput
          label="Username"
          name="username"
          userInputProps={{
            type: "text",
            placeholder: "Enter your username",
            value: username,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === username) {
                setLogIn(logIn);
                return;
              }
              setLogIn({ ...logIn, username: e.currentTarget.value });
            },
          }}
        />
        {!isFirstLogIn && username === "" && (
          <ErrorPopUp message="please enter a username" />
        )}
        <UserInput
          label="Password"
          name="password"
          userInputProps={{
            type: "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === password) {
                setLogIn(logIn);
                return;
              }
              setLogIn({ ...logIn, password: e.currentTarget.value });
            },
          }}
        />
        {!isFirstLogIn && password === "" && (
          <ErrorPopUp message="please enter a password" />
        )}
        <input className="submit" type="submit" value="Log In" />
      </form>
    </div>
  );
};

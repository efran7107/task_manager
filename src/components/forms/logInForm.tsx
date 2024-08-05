import { useState } from "react";
import { UserInput } from "../inputs/formInputs";
import { defaultLogIn } from "../../functions/defaultStates";

export const LogInForm = () => {
  const [logIn, setLogIn] = useState(defaultLogIn);
  const { username, password } = logIn;

  return (
    <div className="log-in">
      <h2>Log In</h2>
      <form className="inputs">
        <UserInput
          label="Username"
          name="username"
          userInputProps={{
            type: "text",
            placeholder: "Enter your username",
            value: username,
            onChange: (e) =>
              setLogIn({ ...logIn, username: e.currentTarget.value }),
          }}
        />
        <UserInput
          label="Password"
          name="password"
          userInputProps={{
            type: "password",
            placeholder: "Enter your password",
            value: password,
            onChange: (e) =>
              setLogIn({ ...logIn, password: e.currentTarget.value }),
          }}
        />
        <input className="submit" type="submit" value="Log In" />
      </form>
    </div>
  );
};

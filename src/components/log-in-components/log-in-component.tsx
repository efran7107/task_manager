import { LogInInput } from "../../types/logInProviderTypes";
import { UserInput } from "../inputs/userInput";

export const UserSignIn = ({
  logIn,
  setLogIn,
}: {
  logIn: LogInInput;
  setLogIn: (logIn: LogInInput) => void;
}) => {
  const { username, password } = logIn;
  return (
    <div 
      className="log-in-info"
      >
      <UserInput
        id="username"
        label="Username"
        userInput={{
          type: "text",
          id: "username",
          value: username,
          onChange: (e) =>
            setLogIn({ ...logIn, username: e.currentTarget.value }),
        }}
      />
      <UserInput
        id="password"
        label="Password"
        userInput={{
          type: "password",
          id: "password",
          value: password,
          onChange: (e) =>
            setLogIn({ ...logIn, password: e.currentTarget.value }),
        }}
      />
    </div>
  );
};

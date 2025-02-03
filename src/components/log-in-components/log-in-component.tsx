import { LogInInput } from "../../types/logInProviderTypes";
import { UserInput } from "../inputs/userInput";
import { ReactNode } from "react";

export const UserSignIn = ({
  logIn,
  setLogIn,
}: {
  logIn: LogInInput;
  setLogIn: (logIn: LogInInput) => void;
}) => {
  const getInputs = (): ReactNode[] => {
    const inputs = [];
    for (const [key, val] of Object.entries(logIn)) {
      const label = key.slice(0, 1).toUpperCase() + key.slice(1);
      inputs.push(
        <UserInput
          key={key}
          id={key}
          curKey={key}
          label={label}
          userInput={{
            value: val,
            onChange: (e) =>
              setLogIn({ ...logIn, [key]: e.currentTarget.value }),
          }}
        />
      );
    }
    return inputs;
  };

  return <div className="log-in-info">{getInputs().map((input) => input)}</div>;
};

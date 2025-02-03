import { ReactNode } from "react";
import { SignUpInput } from "../../types/logInProviderTypes";
import { UserInput } from "../inputs/userInput";

export const UserSignUp = ({
  signUp,
  setSignUp,
}: {
  signUp: SignUpInput;
  setSignUp: (signUp: SignUpInput) => void;
}) => {
  const getInputs = (): ReactNode[] => {
    const inputs = [];
    for (const [key, val] of Object.entries(signUp)) {
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
              setSignUp({ ...signUp, [key]: e.currentTarget.value }),
          }}
        />
      );
    }
    return inputs;
  };
  return (
    <div className="sign-up-info">{getInputs().map((inputs) => inputs)}</div>
  );
};

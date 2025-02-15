import { ReactNode } from "react";
import { UserInput } from "../inputs/userInput";
import { convertCamelToLabel } from "../../functions/functions.ts";

export const UserCreateTeam = ({
  createTeam,
  changeCreateTeam,
}: {
  createTeam: {
    teamName: string;
    auth: string;
    confirm: string;
  };
  changeCreateTeam: (key: string, value: string) => void;
}) => {
  const getInputs = (): ReactNode[] => {
    const inputs = [];
    for (const [key, val] of Object.entries(createTeam)) {
      const label = convertCamelToLabel(key);
      inputs.push(
        <UserInput
          key={key}
          id={key}
          curKey={key}
          label={label}
          userInput={{
            value: val,
            onChange: (e) => changeCreateTeam(key, e.target.value),
          }}
        />
      );
    }
    return inputs;
  };

  return (
    <div className="team-input-cont">{getInputs().map((input) => input)}</div>
  );
};

import { ReactNode } from "react";
import { UserInput } from "../inputs/userInput";
import { convertCamelToLabel } from "../../functions/finctions";

export const UserJoinTeam = ({
  joinTeam,
  changeJoinTeam,
}: {
  changeJoinTeam: (key: string, value: string) => void;
  joinTeam: {
    teamName: string;
    auth: string;
  };
}) => {
  const getInputs = (): ReactNode[] => {
    const inputs = [];
    for (const [key, val] of Object.entries(joinTeam)) {
      const label = convertCamelToLabel(key);
      inputs.push(
        <UserInput
          key={key}
          id={key}
          curKey={key}
          label={label}
          userInput={{
            value: val,
            onChange: (e) => changeJoinTeam(key, e.target.value),
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

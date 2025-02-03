import { UserInputProp } from "../../types/globalTypes";

export const UserInput = ({
  id,
  curKey,
  label,
  userInput,
}: {
  id: string;
  curKey: string;
  label: string;
  userInput: UserInputProp;
}) => {
  const getType = (): string => {
    if (curKey === "password" || curKey === "auth" || curKey === "confirm")
      return "password";
    else return "text";
  };

  return (
    <div className="input-cont">
      <label htmlFor={id}>{label}: </label>
      <input {...userInput} type={getType()} />
    </div>
  );
};

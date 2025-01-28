import { UserInputProp } from "../../types/globalTypes";

export const UserInput = ({
  id,
  label,
  userInput,
}: {
  id: string;
  label: string;
  userInput: UserInputProp;
}) => {
  return (
    <div className="input-cont">
      <label htmlFor={id}>{label}: </label>
      <input {...userInput} />
    </div>
  );
};

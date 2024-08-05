import { UserInputProp } from "../../types/objectTypes";

export const UserInput = ({
  label,
  name,
  userInputProps,
}: {
  label: string;
  name: string;
  userInputProps: UserInputProp;
}) => {
  return (
    <div className="user-input">
      <label htmlFor={name}>{label}: </label>
      <input type="text" name={name} id={name} {...userInputProps} />
    </div>
  );
};

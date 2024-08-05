import { UserInputProp } from "../../types/objectTypes";

export const UserInput = ({
  label,
  name,
  id,
  userInputProps,
}: {
  label: string;
  name: string;
  id: string;
  userInputProps: UserInputProp;
}) => {
  return (
    <div className="user-input">
      <label htmlFor={name}>{label}</label>
      <input type="text" name={name} id={id} {...userInputProps} />
    </div>
  );
};

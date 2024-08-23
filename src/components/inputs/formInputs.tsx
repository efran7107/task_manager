import { Component, ComponentProps } from "react";

type UserInputProp = ComponentProps<"input">;
type UserTextareaProp = ComponentProps<"textarea">;

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

export const ErrorPopUp = ({ message }: { message: string }) => {
  return (
    <div className="error-pop-up">
      <p>{message}</p>
    </div>
  );
};

export class UserTextareaInput extends Component<{
  label: string;
  name: string;
  userTextareaInput: UserTextareaProp;
}> {
  render() {
    const { label, name, userTextareaInput } = this.props;

    return (
      <div className="textarea-input">
        <label htmlFor={name}>{label}</label>
        <textarea name={name} id={name} {...userTextareaInput}></textarea>
      </div>
    );
  }
}

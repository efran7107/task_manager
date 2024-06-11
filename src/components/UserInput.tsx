import { ComponentProps } from "react";

type UserProps = ComponentProps<"input">;
type UserAreaProps = ComponentProps<"textarea">;

export const UserInput = ({
  id,
  label,
  className,
  userProps,
}: {
  id: string;
  label: string;
  className: string;
  userProps: UserProps;
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}: </label>
      <input {...userProps} />
    </div>
  );
};

export const UserTextArea = ({
  id,
  label,
  className,
  userProps,
}: {
  id: string;
  label: string;
  className: string;
  userProps: UserAreaProps;
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}: </label>
      <textarea {...userProps} />
    </div>
  );
};

export const dateInput = ({
  id,
  label,
  userProps,
}: {
  id: string;
  label: string;
  userProps: UserProps;
  date: string;
}) => {
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input {...userProps} />
    </>
  );
};

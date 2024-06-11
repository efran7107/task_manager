import { Status } from "@/types/types";
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
      <input name={id} id={id} autoComplete="off" {...userProps} />
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
      <textarea id={id} name={id} {...userProps} />
    </div>
  );
};

export const DateInput = ({
  id,
  label,
  userProps,
}: {
  id: string;
  label: string;
  userProps: UserProps;
}) => {
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
        type="text"
        min={1}
        id={id}
        name={id}
        inputMode="numeric"
        maxLength={2}
        {...userProps}
      />
    </>
  );
};

export const StatusInput = ({
  id,
  label,
  userProps,
  status,
}: {
  id: string;
  label: string;
  userProps: UserProps;
  status: Status;
}) => {
  return (
    <>
      <label htmlFor={id}>{label}: </label>
      <input
        type="radio"
        name={id}
        id={id}
        checked={status === id}
        {...userProps}
      />
    </>
  );
};

import { ComponentProps } from "react";

type UserProps = ComponentProps<"input">;

export const LogInInput = ({
  id,
  label,
  userProps,
}: {
  id: string;
  label: string;
  userProps: UserProps;
}) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{label}: </label>
      <input {...userProps} />
    </div>
  );
};

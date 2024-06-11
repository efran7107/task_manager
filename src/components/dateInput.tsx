import { UserInput } from "./UserInput";

export const DateInput = ({
  id,
  dueDate,
  className,
  label,
}: {
  id: string;
  dueDate: string;
  className: string;
  label: string;
}) => {
  <div className={className}>
    <label htmlFor={id}>{label}: </label>
    <div className="date">
      <DateInput />
    </div>
  </div>;
};

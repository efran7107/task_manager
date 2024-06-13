import { Task } from "@/types/types";

export const ImportantInput = ({
  id,
  label,
  className,
  task,
  setImportant,
}: {
  id: string;
  label: string;
  className: string;
  task: Task;
  setImportant: (task: Task) => void;
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}: </label>
      <input
        type="checkbox"
        name={id}
        id={id}
        defaultChecked={task.isImportant}
        onChange={() => {
          setImportant({ ...task, isImportant: !task.isImportant });
        }}
      />
    </div>
  );
};

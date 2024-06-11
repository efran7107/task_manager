import { Task } from "@/types/types";
import { StatusInput } from "./UserInput";

export const StatusInputs = ({
  id,
  label,
  className,
  userTask,
  setUserTask,
}: {
  id: string;
  label: string;
  className: string;
  userTask: Task;
  setUserTask: (task: Task) => void;
}) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}: </label>
      <StatusInput
        id="to-do"
        label="To-Do"
        status={userTask.status}
        userProps={{
          onChange: () => {
            setUserTask({ ...userTask, status: "to-do" });
          },
        }}
      />
      <StatusInput
        id="doing"
        label="Doing"
        status={userTask.status}
        userProps={{
          onChange: () => {
            setUserTask({ ...userTask, status: "doing" });
          },
        }}
      />
      <StatusInput
        id="done"
        label="Done"
        status={userTask.status}
        userProps={{
          onChange: () => {
            setUserTask({ ...userTask, status: "done" });
          },
        }}
      />
    </div>
  );
};

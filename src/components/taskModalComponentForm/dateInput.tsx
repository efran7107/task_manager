import { Task } from "@/types/types";
import { DateInput } from "./UserInput";
import { functions } from "@/functions/functions";

export const DateInputs = ({
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
      <div className="date">
        <DateInput
          id="month"
          label="Month"
          userProps={{
            max: 12,
            value: userTask.dueDate.split("/")[0],
            onChange: (e) => {
              setUserTask({
                ...userTask,
                dueDate: `${e.target.value}/${userTask.dueDate.split("/")[1]}/${
                  userTask.dueDate.split("/")[2]
                }`,
              });
            },
          }}
        />
        /
        <DateInput
          id="day"
          label="Day"
          userProps={{
            max: functions.getMaxDaysForMonth(
              Number(userTask.dueDate.split("/")[0]),
              Number(userTask.dueDate.split("/")[2])
            ),
            value: userTask.dueDate.split("/")[1],
            onChange: (e) => {
              setUserTask({
                ...userTask,
                dueDate: `${userTask.dueDate.split("/")[0]}/${e.target.value}/${
                  userTask.dueDate.split("/")[2]
                }`,
              });
            },
          }}
        />
        <DateInput
          id="year"
          label="Year"
          userProps={{
            value: userTask.dueDate.split("/")[2],
            onChange: (e) => {
              setUserTask({
                ...userTask,
                dueDate: `${userTask.dueDate.split("/")[0]}/${
                  userTask.dueDate.split("/")[1]
                }/${e.target.value}`,
              });
            },
          }}
        />
      </div>
    </div>
  );
};

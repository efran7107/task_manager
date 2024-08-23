import { useState } from "react";
import { UserInput } from "../inputs/formInputs";
import { defaultNewTask } from "../../functions/defaultStates";
import { useUser } from "../../functions/providersContext";

export const AddTask = () => {
  const { user } = useUser();
  const [newTask, setNewTask] = useState({ ...defaultNewTask, ucId: user.id });
  const { title, desc, status, dueDate, dateCreated, isUrgent } = newTask;
  return (
    <div className="add-task-cont">
      <h2 className="add-task">Add Task</h2>
      <form className="add-task-form">
        <UserInput label="Task Name" name="taskName" userInputProps={{}} />
      </form>
    </div>
  );
};

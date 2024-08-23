import { UserInput } from "../inputs/formInputs";

export const AddTask = () => {
  return (
    <div className="add-task-cont">
      <h2 className="add-task">Add Task</h2>
      <form className="add-task-form">
        <UserInput label="Task Name" name="taskName" userInputProps={{}} />
      </form>
    </div>
  );
};

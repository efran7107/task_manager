import { Component, ComponentProps, ReactNode } from "react";
import { Status, Task } from "../../types/objectTypes";

type UserInputProp = ComponentProps<"input">;
type UserTextareaProp = ComponentProps<"textarea">;
type propInputs = {
  newTask: Omit<Task, "id">;
  setNoteTask: (newtask: Omit<Task, "id">) => void;
};

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

export class UserStatusInput extends Component<{
  newTask: Omit<Task, "id">;
  setNewTask: (task: Omit<Task, "id">) => void;
}> {
  render() {
    const { newTask, setNewTask } = this.props;
    const { status } = newTask;
    return (
      <div className="user-status-input">
        <label htmlFor="status">Status: </label>
        <div className="status-update">
          <div className="status">
            <label htmlFor="to-do">to-do</label>
            <input
              type="radio"
              name="to-do"
              id="toDo"
              value="to-do"
              checked={status === "to-do" ? true : false}
              onChange={() => setNewTask({ ...newTask, status: "to-do" })}
            />
          </div>
          <div className="status">
            <label htmlFor="doing">doing</label>
            <input
              type="radio"
              name="doing"
              id="doing"
              value="doing"
              checked={status === "doing" ? true : false}
              onChange={() => setNewTask({ ...newTask, status: "doing" })}
            />
          </div>
          <div className="status">
            <label htmlFor="done">done</label>
            <input
              type="radio"
              name="done"
              id="done"
              value="done"
              checked={status === "done" ? true : false}
              onChange={() => setNewTask({ ...newTask, status: "done" })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export class userDateInput extends Component {
  render() {
    return <></>;
  }
}

import { useState } from "react";
import { useUser } from "./componentsProvider/UserProvider";
import { Task } from "@/types/types";
import "@/styles/modalForm.css";
import "@/styles/taskBoard.css";
import { functions } from "@/functions/functions";
import { validations } from "@/functions/validation";
import toast from "react-hot-toast";
import { UserInput, UserTextArea } from "./taskModalComponentForm/UserInput";
import { DateInputs } from "./taskModalComponentForm/dateInput";
import { StatusInputs } from "./taskModalComponentForm/StatusInput";
import { ImportantInput } from "./taskModalComponentForm/InportantInput";
import { TagList } from "./apiComponents/tagList";

export const TaskModalForm = ({
  task,
  pastDue,
}: {
  task: Task;
  pastDue: boolean;
}) => {
  const { closeActiveTask, allData, setIsEditTask, deleteTask, editTask } =
    useUser();
  const { tags, taskTags } = allData;
  const [userTask, setUserTask] = useState<Task>(task);
  const [tagInput, setTagInput] = useState("");
  const tagList = functions.getTaskTags(tags, taskTags, userTask.id);

  return (
    <form
      className={`modal-container active ${pastDue ? "past-duedate" : ""} edit`}
      onSubmit={(e) => e.preventDefault()}
    >
      <i
        className="fa-solid fa-xmark"
        onClick={() => {
          setIsEditTask(false);
          closeActiveTask();
        }}
      ></i>
      <i
        className={
          userTask.isImportant
            ? "fa-solid fa-triangle-exclamation important"
            : "fa-solid fa-triangle-exclamation"
        }
      ></i>
      <i
        className="fa-solid fa-cloud-arrow-up"
        onClick={() => {
          if (
            validations.isNotBlank(userTask.taskName) ||
            validations.isNotBlank(userTask.description)
          ) {
            setUserTask({
              ...userTask,
              taskName: task.taskName,
              description: task.description,
            });
            toast.error(
              "Please fill in both task name and description to save changes."
            );
            return;
          }
          editTask(userTask, userTask.id);
        }}
      ></i>
      <a
        className="cancel-form"
        onClick={() => {
          setIsEditTask(false);
        }}
      >
        Cancel
      </a>
      <i
        className="fa-solid fa-trash"
        onClick={() => {
          deleteTask();
        }}
      ></i>
      <UserInput
        id="taskName"
        label="Task Name"
        className="task-name-input"
        userProps={{
          type: "text",
          value: userTask.taskName,
          onChange: (e) => {
            setUserTask({ ...userTask, taskName: e.target.value });
          },
        }}
      />
      <UserTextArea
        id="taskDescription"
        label="Task"
        className="task-description-input"
        userProps={{
          value: userTask.description,
          onChange: (e) => {
            setUserTask({ ...userTask, description: e.target.value });
          },
        }}
      />
      <DateInputs
        id="dueDate"
        label="Due Date"
        className="date-input"
        userTask={userTask}
        setUserTask={setUserTask}
      />
      <StatusInputs
        id="status"
        label="Status"
        className="status-update"
        userTask={userTask}
        setUserTask={setUserTask}
      />
      <ImportantInput
        id="important"
        label="Important"
        className="important-input"
        task={userTask}
        setImportant={setUserTask}
      />
      <TagList
        id="tags"
        label="Tags"
        className="tags-edit"
        tagList={tagList}
        tagInput={tagInput}
        setTagInput={setTagInput}
        task={userTask}
      />
      <div className="tags-list">
        {tagList.map((tag) => (
          <p key={tag.id}>{tag.tagName}</p>
        ))}
      </div>
    </form>
  );
};

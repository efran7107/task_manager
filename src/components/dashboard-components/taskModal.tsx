import { useUser } from "../../functions/providersContext";
import "../../styles/task-modal.css";
import { defaultNewTask } from "../../functions/defaultStates";

export const TaskModal = ({
  setHasActiveTask,
}: {
  setHasActiveTask: (hasActiveTask: boolean) => void;
}) => {
  const { allData, setPage, activeTask, setActiveTask, user } = useUser();
  const { users } = allData;
  const { id, title, desc, status, dueDate, dateCreated, isUrgent, ucId } =
    activeTask;
  const userCreaterId = users.find((user) => user.id === ucId)!;
  return (
    <div className="task-modal-cont">
      <div id={id.toString()} className="task-modal">
        <i
          className="fa-solid fa-circle-xmark"
          onClick={() => {
            setHasActiveTask(false);
            setActiveTask({ ...defaultNewTask, id: 0 });
          }}
        ></i>
        {isUrgent && <span className="urgent">Urgent</span>}
        <h3>{title}</h3>
        <p>{desc}</p>
        <p>Status: {status}</p>
        <p>Due: {dueDate}</p>
        <p>Date Created: {dateCreated}</p>
        <p>
          Author: {userCreaterId.firstName} {userCreaterId.lastName}
        </p>
        <div className="btn-container">
          {ucId === user.id && (
            <>
              <input
                type="button"
                value={"\uf044"}
                onClick={() => {
                  setPage("edit task");
                  return;
                }}
              />
              <input
                type="button"
                value={"\uf2ed"}
                onClick={() => {
                  return;
                }}
              />
            </>
          )}
          <input
            type="button"
            value={"\uf249"}
            onClick={() => {
              setPage("task-notes");
            }}
          />
        </div>
      </div>
    </div>
  );
};

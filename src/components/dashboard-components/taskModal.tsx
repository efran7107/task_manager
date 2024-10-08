import { useUser } from "../../functions/providersContext";
import "../../styles/task-modal.css";
import { defaultNewTask } from "../../functions/defaultStates";
import { apiFunctions } from "../../functions/apiFunctions";
import toast from "react-hot-toast";

export const TaskModal = ({
  setHasActiveTask,
}: {
  setHasActiveTask: (hasActiveTask: boolean) => void;
}) => {
  const { allData, setPage, activeTask, setActiveTask, user, reloadData } =
    useUser();
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
                  apiFunctions
                    .deleteTask(activeTask, allData, setPage, reloadData)
                    .then(() => {
                      toast.success("task deleted");
                      setHasActiveTask(false);
                      setActiveTask({ ...defaultNewTask, id: 0 });
                      setPage("dashboard");
                    })
                    .catch(() => {
                      setPage("error");
                      toast.error("error deleting task");
                    });
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

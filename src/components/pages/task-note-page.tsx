import { useUser } from "../../functions/providersContext";

export const TaskNotePage = () => {
  const { activeTask, allData } = useUser();

  const { users, notes } = allData;
  const { id, title, desc, status, dueDate, dateCreated, isUrgent, ucId } =
    activeTask;
  const taskNotes = notes.filter((note) => note.taskId === activeTask.id);

  return (
    <div className="task-notes-cont">
      <div className="task">
        <h2>{title}</h2>
        <div className="note-details">
          <p>{desc}</p>
          <p>Status: {status}</p>
          <p>Due: {dueDate}</p>
          <p>Date Created: {dateCreated}</p>
          <p>
            Author: {users.find((user) => user.id === ucId)?.firstName}{" "}
            {users.find((user) => user.id === ucId)?.lastName}
          </p>
          <p>{isUrgent && <span className="urgent">Urgent</span>}</p>
        </div>
      </div>
    </div>
  );
};

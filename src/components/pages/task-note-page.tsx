import { useState } from "react";
import { useUser } from "../../functions/providersContext";
import "../../styles/task-note-page.css";
import { EditNote, NoteDisplay } from "../dashboard-components/note-display";

export const TaskNotePage = () => {
  const { activeTask, allData, setPage } = useUser();

  const { users, notes } = allData;
  const { id, title, desc, status, dueDate, dateCreated, isUrgent, ucId } =
    activeTask;
  const taskNotes = notes.filter((note) => note.taskId === id);
  const [isActiveEdit, setIsActiveEdit] = useState({isEdit: false, editId: -1})

  return (
    <div className="task-notes-cont">
      <h1>
        <i
          className="fa-solid fa-chevron-left"
          onClick={() => setPage("dashboard")}
        ></i>{" "}
        Task Notes
      </h1>
      <div className="task">
        <input
          type="button"
          value={"+ " + "\uf249"}
          onClick={() => setPage("add-note")}
        />
        <h2>{title}</h2>
        <div className="task-details">
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
      <div className="note-list">
        {taskNotes.map((note) => (
          <div className="note-cont" key={note.id}>
            <NoteDisplay note={note} setIsActiveEdit={setIsActiveEdit}/>
            {isActiveEdit.isEdit === true && isActiveEdit.editId === note.id && <EditNote note={note} setIsActiveEdit={setIsActiveEdit}/>}
          </div>
          
        ))}
      </div>
    </div>
  );
};

import { useUser } from "../../functions/providersContext";
import { Note } from "../../types/objectTypes";
import "../../styles/task-note-page.css";
import { useState } from "react";
import { UserNoteInput } from "../inputs/formInputs";
import { PostRequests } from "../../api";
import toast from "react-hot-toast";

export const NoteDisplay = ({ note }: { note: Note }) => {
  const { allData, user } = useUser();
  const { users } = allData;
  const { title, desc, authId, dateCreated } = note;
  return (
    <div className="note">
      {user.id === authId && (
        <div className="note-btn-cont">
          <input type="button" value={"\uf044"} />
          <input type="button" value={"\uf2ed"} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{desc}</p>
      <p>
        Author: {users.find((user) => user.id === authId)?.firstName}{" "}
        {users.find((user) => user.id === authId)?.lastName}
      </p>
      <p>Date Created: {dateCreated}</p>
    </div>
  );
};

export const AddNote = () => {
  const todaysDate = new Date();
  const { activeTask, user, reloadData, setPage } = useUser();
  const [newNote, setNewNote] = useState<Omit<Note, "id">>({
    title: "",
    desc: "",
    authId: user.id,
    taskId: activeTask.id,
    dateCreated: todaysDate.toLocaleDateString(),
  });
  return (
    <div className="add-note-cont">
      <UserNoteInput note={newNote} setNote={setNewNote} />
      <input
        type="button"
        value="Add Note"
        onClick={() => {
          if (newNote.title !== "" && newNote.desc !== "") {
            PostRequests.addNote(newNote)
              .then(() => {
                setPage("task-notes");
                reloadData();
              })
              .catch(() => {
                toast.error("error adding note");
                setPage("error");
              });
          }
        }}
      />
    </div>
  );
};

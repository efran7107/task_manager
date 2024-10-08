import { useUser } from "../../functions/providersContext";
import { Note } from "../../types/objectTypes";
import "../../styles/task-note-page.css";

export const NoteDisplay = ({ note }: { note: Note }) => {
  const { allData, user } = useUser();
  const { users } = allData;
  const { title, desc, authId, dateCreated } = note;
  return (
    <div className="note-display">
      {user.id === authId && (
        <div className="note-btn-cont">
          <input type="button" value={"\uf044"} />
          <input type="button" value="" />
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

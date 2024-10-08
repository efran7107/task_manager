import { useUser } from "../../functions/providersContext";
import { Note } from "../../types/objectTypes";

export const NoteDisplay = ({ note }: { note: Note }) => {
  const { allData } = useUser();
  const { users } = allData;
  const { title, desc, authId, dateCreated } = note;
  return (
    <div className="note-display">
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

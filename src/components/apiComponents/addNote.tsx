import { useState } from "react";
import { UserInput, UserTextArea } from "../taskModalComponentForm/UserInput";
import { defaultData } from "@/functions/DefaultStates";
import { validations } from "@/functions/validation";
import { useUser } from "../componentsProvider/UserProvider";

export const CreateNote = ({
  userId,
  taskId,
  setIsAddingNote,
}: {
  userId: number;
  taskId: number;
  setIsAddingNote: (value: boolean) => void;
}) => {
  const [note, setNote] = useState(defaultData.getDefaultNote);
  const { updateNotes } = useUser();
  return (
    <div className="create-note">
      <p>Create new Note: </p>
      <UserInput
        id="noteTitle"
        label="Note Title"
        className="note-title"
        userProps={{
          type: "text",
          value: note.noteTitle,
          onChange: (e) => {
            setNote({ ...note, noteTitle: e.currentTarget.value });
          },
        }}
      />
      <UserTextArea
        id="note"
        label="Content"
        className="note-content"
        userProps={{
          value: note.content,
          onChange: (e) => {
            setNote({ ...note, content: e.currentTarget.value });
          },
        }}
      />
      <input
        type="submit"
        value="Create Note"
        className="submit-note"
        disabled={validations.isNoteNotEmpty(note.noteTitle, note.content)}
        onClick={() => {
          updateNotes({
            ...note,
            teamMemberId: userId,
            taskId: taskId,
          });
          setNote(defaultData.getDefaultNote);
          setIsAddingNote(false);
        }}
      />
      <button
        type="button"
        className="add-note-btn"
        onClick={() => {
          setNote(defaultData.getDefaultNote);
          setIsAddingNote(false);
        }}
      >
        Cancle
      </button>
    </div>
  );
};

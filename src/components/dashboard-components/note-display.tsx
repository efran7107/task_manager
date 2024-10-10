import { useUser } from "../../functions/providersContext";
import { Note } from "../../types/objectTypes";
import "../../styles/task-note-page.css";
import { useState } from "react";
import { UserNoteInput } from "../inputs/formInputs";
import { DeleteRequests, PatchRequests, PostRequests } from "../../api";
import toast from "react-hot-toast";

export const NoteDisplay = ({ 
  note,
  setIsActiveEdit
}: { 
  note: Note,
  setIsActiveEdit: ({isEdit, editId}:{isEdit: boolean, editId: number}) => void 
}) => {
  const { allData, setAllData, user, reloadData, setPage } = useUser();
  const { users, notes } = allData;
  const { id, title, desc, authId, dateCreated } = note;
  return (
    <div className="note">
      
      <h3>{title}</h3>
      <p>{desc}</p>
      <p>
        Author: {users.find((user) => user.id === authId)?.firstName}{" "}
        {users.find((user) => user.id === authId)?.lastName}
      </p>
      <p>Date Created: {dateCreated}</p>
      {user.id === authId && (
        <div className="note-btn-cont">
          <input type="button" value={"\uf044"} onClick={() => {
            setIsActiveEdit({isEdit: true, editId: id})
          }} />
          <input type="button" value={"\uf2ed"} onClick={() => {
              setAllData({...allData, notes: notes.filter((note) => note.id !== id)})
              DeleteRequests.deleteNote(id)
                .then(() => reloadData())
                .catch(() => {
                  setAllData(allData)
                  toast.error('Error deleting note')
                  setPage('error')
                })
            }}/>
        </div>
      )}
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
      <div className="add-note-title">
        <h2><i className="fa-solid fa-chevron-left" onClick={() => {
          setPage('dashboard')
        }}></i> Add Note</h2>
      </div>
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

export const EditNote = ({
  note,
  setIsActiveEdit
}: {
  note: Note,
  setIsActiveEdit: ({isEdit, editId} : {isEdit: boolean, editId: number}) => void
}) => {

  const {allData, setAllData, setPage, reloadData} = useUser()
  const {notes} = allData
  const {id, ...noteNoId} = note

  const [editNote, setEditNote] = useState<Omit<Note,"id">>(noteNoId);
  

  return (
    <div className="edit-note-cont">
      <i className="fa-solid fa-circle-xmark" onClick={() => setIsActiveEdit({isEdit: false, editId: -1})}></i>
      <UserNoteInput note={editNote} setNote={setEditNote} />
      <input
      className="edit-note"
        type="button"
        value="Edit Note"
        onClick={() => {
          setAllData({...allData, notes: notes.map((note) => note.id === id ? {...editNote, id: id} : note) })
          PatchRequests.updateNote({...editNote, id: id})
            .then(() => {
              reloadData()
              setIsActiveEdit({isEdit: false, editId: -1})
            })
            .catch(() => {
              toast.error('trouble updating note')
              setPage('error')
            })
        }}
      />
    </div>
  )
}

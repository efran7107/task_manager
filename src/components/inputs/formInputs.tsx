import { Component, ComponentProps } from "react";
import { Note, Tag, Task, Team, User } from "../../types/objectTypes";
import { format } from "../../functions/formatting";

type UserInputProp = ComponentProps<"input">;
type UserTextareaProp = ComponentProps<"textarea">;
type PropInputs = {
  newTask: Omit<Task, "id">;
  setNewTask: (newtask: Omit<Task, "id">) => void;
};

export const UserInput = ({
  label,
  name,
  userInputProps,
}: {
  label: string;
  name: string;
  userInputProps: UserInputProp;
}) => {
  return (
    <div className="user-input">
      <label htmlFor={name}>{label}: </label>
      <input type="text" name={name} id={name} {...userInputProps} />
    </div>
  );
};

export const ErrorPopUp = ({ message }: { message: string }) => {
  return (
    <div className="error-pop-up">
      <p>{message}</p>
    </div>
  );
};

export class UserTextareaInput extends Component<{
  label: string;
  name: string;
  userTextareaInput: UserTextareaProp;
}> {
  render() {
    const { label, name, userTextareaInput } = this.props;

    return (
      <div className="textarea-input">
        <label htmlFor={name}>{label}: </label>
        <textarea name={name} id={name} {...userTextareaInput}></textarea>
      </div>
    );
  }
}

export class UserStatusInput extends Component<{
  propInputs: PropInputs;
}> {
  render() {
    const { newTask, setNewTask } = this.props.propInputs;
    const { status } = newTask;
    return (
      <div className="user-status-input">
        <label htmlFor="status">Status: </label>
        <div className="status-update">
          <div className="status">
            <label htmlFor="to-do">to-do</label>
            <input
              type="radio"
              name="to-do"
              id="toDo"
              value="to-do"
              checked={status === "to-do" ? true : false}
              onChange={() => setNewTask({ ...newTask, status: "to-do" })}
            />
          </div>
          <div className="status">
            <label htmlFor="doing">doing</label>
            <input
              type="radio"
              name="doing"
              id="doing"
              value="doing"
              checked={status === "doing" ? true : false}
              onChange={() => setNewTask({ ...newTask, status: "doing" })}
            />
          </div>
          <div className="status">
            <label htmlFor="done">done</label>
            <input
              type="radio"
              name="done"
              id="done"
              value="done"
              checked={status === "done" ? true : false}
              onChange={() => setNewTask({ ...newTask, status: "done" })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export class UserDateInput extends Component<{
  propInputs: PropInputs;
}> {
  render() {
    const { newTask, setNewTask } = this.props.propInputs;
    const todaysDate = new Date();

    return (
      <div className="due-date-input">
        <label htmlFor="due-date">Due Date: </label>
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          onChange={(e) => {
            const newDate = new Date(e.currentTarget.valueAsNumber);
            setNewTask({ ...newTask, dueDate: newDate.toLocaleDateString() });
          }}
          min={todaysDate.toJSON().split("T")[0]}
        />
      </div>
    );
  }
}

export const UserNoteInput = ({
  note,
  setNote
}:{
  note: Omit<Note, 'id'>;
  setNote: (note: Omit<Note, 'id'>) => void
}) => {
  return(
    <div className="new-note-cont">
      <div className="h6">Add Note: </div>
      
      <UserInput 
        label="Title"
        name="title"
        userInputProps={{
          value: note.title,
          onChange: (e) => setNote({...note, title: e.currentTarget.value})
        }}
      />
      <UserTextareaInput 
        label="Description"
        name="description"
        userTextareaInput={{
          value: note.desc,
          onChange: (e) => setNote({...note, desc: e.currentTarget.value})
        }}
      />
      
    </div>
  )
}

export class ExistingTagInput extends Component<{
  newTagSet: Omit<Tag, "id">[];
  setNewTagSet: (newTagSet: Omit<Tag, "id">[]) => void;
  tags: Tag[];
}> {
  state = {
    newTagInput: { tag: "#" },
  };

  render() {
    const { newTagSet, setNewTagSet, tags } = this.props;
    const { newTagInput } = this.state;
    const existingTagsDisplayed = tags.filter(
      (tag) =>
        newTagSet.find((existTag) => existTag.tag === tag.tag) === undefined
    );

    return (
      <div className="task-tag-entry">
        <div className="tag-selections">
          <div className="tag-display">
            <div className="tag-section">
              <h3>Existing Tags:</h3>
              <p>click to add an existing tag</p>
            </div>
            <div className="existing-tags">
              {format
                .filterTags(existingTagsDisplayed, newTagInput.tag)
                .map((newTag) => (
                  <a
                    key={newTag.id}
                    onClick={() => setNewTagSet([...newTagSet, newTag])}
                  >
                    {newTag.tag}
                  </a>
                ))}
            </div>
          </div>
          <div className="existing-tag-list">
            <div className="tag-section">
              <h3>Added Tags: </h3>
              <p>click to delete an added tag</p>
            </div>
            <div className="tags">
              {newTagSet.map((tag) => (
                <a
                  key={tag.tag}
                  onClick={() =>
                    setNewTagSet(newTagSet.filter((tag) => tag.tag !== tag.tag))
                  }
                >
                  {tag.tag}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="add-new-tag">
          <input
            type="text"
            name="newTag"
            id="newTag"
            value={newTagInput.tag}
            onChange={(e) => {
              if (e.currentTarget.value[0] !== "#") return;
              if (
                e.currentTarget.value.trim() !== newTagInput.tag ||
                e.currentTarget.value[0] === "#"
              )
                this.setState({
                  newTagInput: { tag: e.currentTarget.value },
                });

              if (e.currentTarget.value === "#") return;
            }}
          />
          <input
            type="button"
            value="Add Tag"
            onClick={() => {
              if (
                tags.find((tag) => tag.tag === newTagInput.tag) !== undefined
              ) {
                setNewTagSet([
                  ...newTagSet,
                  tags.find((tag) => tag.tag === newTagInput.tag)!,
                ]);
                this.setState({
                  newTagInput: { tag: "#" },
                });
              }
              if (newTagInput.tag.trim() !== "#") {
                setNewTagSet([...newTagSet, newTagInput]);
                this.setState({
                  newTagInput: { tag: "#" },
                });
              }
            }}
          />
        </div>
      </div>
    );
  }
}

export const AddUsers = ({
  users,
  userId,
  team,
  assignedUsers,
  setAssignedUsers,
}: {
  users: User[];
  userId: number;
  team: Team;
  assignedUsers: User[];
  setAssignedUsers: (users: User[]) => void;
}) => {
  const nonAssignedUsers = users.filter(
    (user) =>
      assignedUsers.find((assigned) => assigned.id === user.id) === undefined &&
      user.id !== userId &&
      user.id !== team.teamLeadId
  );

  return (
    <div className="add-users">
      <div className="non-assigned-users">
        <h3>Available Users</h3>
        <p>click to add a user</p>
        <div className="available-users">
          {nonAssignedUsers.map((user) => (
            <a
              key={user.id}
              className="user"
              onClick={() => setAssignedUsers([...assignedUsers, user])}
            >
              {user.firstName} {user.lastName}
            </a>
          ))}
        </div>
      </div>
      <div className="assigned-users">
        <h3>Assigned Users</h3>
        <p>click to remove a user</p>
        <div className="available-users">
          {assignedUsers.map((user) => (
            <a
              key={user.id}
              className="user"
              onClick={() =>
                setAssignedUsers(
                  assignedUsers.filter((assUser) => assUser.id !== user.id)
                )
              }
            >
              {user.firstName} {user.lastName}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

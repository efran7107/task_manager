import { useState } from "react";
import {
  UserDateInput,
  UserInput,
  UserStatusInput,
  UserTextareaInput,
} from "../inputs/formInputs";
import { defaultNewTask } from "../../functions/defaultStates";
import { useUser } from "../../functions/providersContext";
import { functions } from "../../functions/functions";
import { Tag } from "../../types/objectTypes";

export const AddTask = () => {
  const todaysDate = new Date();
  const { user, allData, setPage } = useUser();
  const { users, teams, teamMemberLinks, tags } = allData;
  const [newTask, setNewTask] = useState({
    ...defaultNewTask,
    ucId: user.id,
    dateCreated: todaysDate.toLocaleDateString(),
  });
  const { title, desc, isUrgent } = newTask;
  const userTeamProfiles = functions.getTeamMemberInfo(
    user,
    teams,
    teamMemberLinks,
    users
  );

  const [newTagSet, setNewTagSet] = useState<Omit<Tag, "id">[]>([]);

  const [activeTeam, setActiveTeam] = useState(userTeamProfiles[0]);
  const { team, teamMembers } = activeTeam;
  return (
    <div className="add-task-cont">
      <h2 className="add-task">Add Task</h2>
      <div className="team-selection">
        <button className="team-select">{team.teamName}</button>
        <div className="options">
          {userTeamProfiles.map((set) => (
            <a key={set.team.id} href="">
              {set.team.teamName}
            </a>
          ))}
        </div>
      </div>
      <form className="add-task-form">
        <UserInput
          label="Task Name"
          name="taskName"
          userInputProps={{
            type: "text",
            value: `${title}`,
            onChange: (e) => {
              setNewTask({ ...newTask, title: e.currentTarget.value });
            },
          }}
        />
        <UserTextareaInput
          label="Description"
          name="desc"
          userTextareaInput={{
            value: `${desc}`,
            onChange: (e) => {
              setNewTask({ ...newTask, desc: e.currentTarget.value });
            },
            placeholder: "enter the task description here",
          }}
        />
        <UserStatusInput
          propInputs={{ newTask: newTask, setNewTask: setNewTask }}
        />
        <UserDateInput
          propInputs={{ newTask: newTask, setNewTask: setNewTask }}
        />
        <div className="urgent-cont">
          <label className="urgent-label">Urgent:</label>
          <input
            type="checkbox"
            name="isUrgent"
            id="isUrgent"
            defaultChecked={isUrgent}
            onClick={() =>
              setNewTask({ ...newTask, isUrgent: isUrgent ? false : true })
            }
          />
        </div>
      </form>
    </div>
  );
};

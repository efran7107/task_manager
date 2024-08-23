import { Profiler, useState } from "react";
import { UserInput } from "../inputs/formInputs";
import { defaultNewTask } from "../../functions/defaultStates";
import { useUser } from "../../functions/providersContext";
import { functions } from "../../functions/functions";

export const AddTask = () => {
  const { user, allData, setPage } = useUser();
  const { users, teams, teamMemberLinks } = allData;
  const [newTask, setNewTask] = useState({ ...defaultNewTask, ucId: user.id });
  const { title, desc, status, dueDate, dateCreated, isUrgent } = newTask;
  const userTeamProfiles = functions.getTeamMemberInfo(
    user,
    teams,
    teamMemberLinks,
    users
  );

  const [activeTeam, setActiveTeam] = useState(userTeamProfiles[0]);
  const { team, teamMembers } = activeTeam;
  return (
    <div className="add-task-cont">
      <h2 className="add-task">Add Task</h2>
      <div className="team-selection">
        <button className="team-select">{team.teamName}</button>
        <div className="options">
          {userTeamProfiles.map((set) => (
            <a href="">{set.team.teamName}</a>
          ))}
        </div>
      </div>
      <form className="add-task-form">
        <UserInput label="Task Name" name="taskName" userInputProps={{}} />
      </form>
    </div>
  );
};

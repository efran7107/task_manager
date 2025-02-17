import {useUser} from "../../functions/providersContext.ts";


export const DashboardNav = () => {
  const { user, logUserOut, userJoinTeam, userCreateTask } = useUser()
  const {name, username} = user.getUserNames()
  return (
    <div className="user-dash-nav">
      <div className="username-cont">
        <p>{username}</p>
        <p>({name})</p>
      </div>
      <div className="action-cont">
        <a onClick={userCreateTask}>Create Task</a>
        <a onClick={userJoinTeam}>Join Team</a>
        <a>View Stats</a>
        <a onClick={logUserOut}>Log Out</a>
      </div>
    </div>
  );
};

import { useUser } from "../../functions/providersContext";

export const DashboardNav = () => {
  const { user } = useUser();
  const {username, name} = user.getUser()
  return (
    <div className="user-dash-nav">
      <div className="username-cont">
        <p>{username}</p>
        <p>({name})</p>
      </div>
      <div className="action-cont">
        <a href="">Create Task</a>
        <a href="">Join Team</a>
        <a href="">View Stats</a>
        <a href="">Log Out</a>
      </div>
    </div>
  );
};

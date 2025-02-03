import { useUser } from "../functions/providersContext";

export const Dashboard = () => {
  const { teamMember } = useUser();
  const { username, name } = teamMember;
  return <div className="user-dash-nav"></div>;
};

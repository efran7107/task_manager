import { DashboardNav } from "./dashboard-components/dashboard-navbar";
import "../css/userDashboard.css";
import {TeamDisplay} from "./dashboard-components/teamDisplay.tsx";
export const Dashboard = () => {
  return (
    <div className="user-dashboard">
      <DashboardNav />
      <hr />
        <div className="teams-and-tasks">
            <TeamDisplay/>
        </div>
    </div>
  );
};

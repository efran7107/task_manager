import { DashboardNav } from "./dashboard-components/dashboard-navbar";
import "../css/userDashboard.css";
export const Dashboard = () => {
  return (
    <div className="user-dashboard">
      <DashboardNav />
      <hr />
    </div>
  );
};

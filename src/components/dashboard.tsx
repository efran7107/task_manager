import { useEffect } from "react";
import { useUser } from "./componentsProvider/UserProvider";

export const UserDashboard = () => {
  const { user } = useUser();

  useEffect(() => {}, []);
  return (
    <>
      <div className="dashboard-header-container">
        <h3>{user!.username}</h3>
      </div>
    </>
  );
};

import { useUser } from "./componentsProvider/UserProvider";
import { UserDashboard } from "./dashboard";
import { LogIn } from "./log-in";

export const TaskManager = () => {
  const { isLoggedIn } = useUser();
  return <>{!isLoggedIn ? <LogIn /> : <UserDashboard />}</>;
};

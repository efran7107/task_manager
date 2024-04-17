import { useUser } from "./componentsProvider/UserProvider";
import { LogIn } from "./log-in";

export const TaskManager = () => {
  const { isLoggedIn } = useUser();
  return <>{!isLoggedIn && <LogIn />}</>;
};

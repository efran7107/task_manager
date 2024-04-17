import { useUser } from "./componentsProvider/UserProvider";

export const UserDashboard = () => {
  const { user } = useUser();
};

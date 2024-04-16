import { Requests } from "@/api/api";
import { TeamMember } from "@/types/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type TUserProvider = {
  allUsers: TeamMember[];
  createUser: (user: Omit<TeamMember, "id">, password: string) => void;
};

const UserContext = createContext<TUserProvider>({} as TUserProvider);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TeamMember | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allUsers, setAllUsers] = useState<TeamMember[]>([]);

  const fetchUsers = () => {
    return Requests.getAllUsers().then((users) => {
      setAllUsers(users);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const createUser = (user: Omit<TeamMember, "id">, password: string) => {
    Requests.registerUser(user).then((teamMember) => {
      Requests.registerUserAuth({
        teamMemberId: teamMember.id,
        password: password,
      });
    });
  };

  return (
    <UserContext.Provider value={{ allUsers, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

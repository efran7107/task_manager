import { Requests } from "@/api/api";
import { TeamMember } from "@/types/types";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

type TUserProvider = {
  user: TeamMember | null;
  isLoggedIn: boolean;
  allUsers: TeamMember[];
  createUser: (user: Omit<TeamMember, "id">, password: string) => void;
  userAuth: (username: string, password: string) => void;
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

  const userAuth = (username: string, password: string) => {
    if (username === "" || password === "") {
      toast.error("Please enter a username and/or password");
      return;
    } else if (
      allUsers.filter((user) => user.username === username && user).length === 0
    ) {
      toast.error("User not found");
      return;
    }
    Requests.getUserPassword(
      allUsers.filter((user) => (user.username === username ? user : null))[0]
        .id
    ).then((passwordAuth) => {
      if (passwordAuth.password !== password) {
        toast.error("Wrong password");
        return;
      }
      toast.success("Login successful");
      setUser(
        allUsers.filter((user) => (user.username === username ? user : null))[0]
      );
      setIsLoggedIn(true);
    });
  };

  // const findExistingUser = (username: string): boolean => {};

  const createUser = (user: Omit<TeamMember, "id">, password: string) => {
    Requests.registerUser(user).then((teamMember) => {
      Requests.registerUserAuth({
        teamMemberId: teamMember.id,
        password: password,
      });
    });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, isLoggedIn, allUsers, createUser, userAuth }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

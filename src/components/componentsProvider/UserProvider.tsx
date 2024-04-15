import { Requests } from "@/api/api";
import { TeamMember } from "@/types/types";
import { ReactNode, createContext, useContext, useState } from "react";

type TUserProvider = {
  user: TeamMember;
  createUser: (
    user: Omit<TeamMember, "teamMemberId">,
    password: string
  ) => void;
};

const UserContext = createContext<TUserProvider>({} as TUserProvider);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TeamMember>({} as TeamMember);

  const createUser = (
    user: Omit<TeamMember, "teamMemberId">,
    password: string
  ) => {
    Requests.registerUser(user).then((teamMember) => {
      console.log(teamMember);
      Requests.registerUserAuth({
        teamMemberId: teamMember.id,
        password: password,
      }).then((userAuth) => {
        console.log(userAuth);
      });
    });
  };

  return (
    <UserContext.Provider value={{ user, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

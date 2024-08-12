import { ReactNode } from "react";
import {
  LogInProviderContext,
  useUser,
} from "../../functions/providersContext";
import toast from "react-hot-toast";
import { apiFunctions } from "../../functions/apiFunctions";
import { invalidUsernamePassword } from "../../functions/defaultStates";
import { functions } from "../../functions/functions";
import { Team, TeamMemberLink, User, UserAuth } from "../../types/objectTypes";
import { PostRequests } from "../../api";
import { validations } from "../../functions/validations";

export const LogInProvider = ({ children }: { children: ReactNode }) => {
  const { allData, setAllData, setUser, setPage } = useUser();

  const { users, teams, teamMemberLinks } = allData;

  const logInUser = async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<boolean> => {
    const validUsernames = users.filter((user) => user.username === username);
    if (validUsernames.length < 1) {
      toast.error(invalidUsernamePassword);
      return false;
    }
    const isValidated = await apiFunctions.validateUser(
      validUsernames[0].id,
      password
    );
    if (!isValidated) {
      return false;
    } else {
      functions.logInUser(setUser, undefined, undefined, validUsernames[0]);
      localStorage.setItem("user", validUsernames[0].username);
      setPage("dashboard");
      return true;
    }
  };

  const signUpUser = async (
    newUser: Omit<User, "id">,
    createTeam: { teamName: string; teamCode: string },
    password: string,
    joinTeam: string
  ) => {
    if (validations.isSameTeamName(createTeam.teamName, teams)) {
      return false;
    }
    const updatedUser = await PostRequests.createUser(newUser);
    const newUserAuth: Omit<UserAuth, "id"> = {
      userId: updatedUser.id,
      password: password,
    };
    await PostRequests.createUserAuth(newUserAuth);
    if (joinTeam === "") {
      const newTeam: Omit<Team, "id"> = {
        teamName: createTeam.teamName,
        teamCode: createTeam.teamCode.toLocaleUpperCase(),
        teamLeadId: updatedUser.id,
      };
      const updatedTeam = await PostRequests.createTeam(newTeam);
      const newTeamMemberLink: Omit<TeamMemberLink, "id"> = {
        teamId: updatedTeam.id,
        userId: updatedUser.id,
      };
      const updatedTeamMemberLink = await PostRequests.createTeamMemberLink(
        newTeamMemberLink
      );
      setAllData({
        ...allData,
        teams: [...teams, updatedTeam],
        users: [...users, updatedUser],
        teamMemberLinks: [...teamMemberLinks, updatedTeamMemberLink],
      });
      return true;
    }
    if (
      teams.filter((team) => team.teamName === joinTeam.toUpperCase()).length <
      1
    ) {
      return false;
    }
  };

  return (
    <LogInProviderContext.Provider
      value={{
        logInUser,
        signUpUser,
      }}
    >
      {children}
    </LogInProviderContext.Provider>
  );
};

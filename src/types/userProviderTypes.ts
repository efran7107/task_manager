import {User} from "../components/classes/user.ts";
import {Team} from "../components/classes/team.ts";


export type TUserProvider = {
  user: User
  userTeams: Team[]
  activeTeam: Team
};

import {TPage} from "./globalTypes.ts";
import {User} from "../classes/User.ts";
import {Team} from "../classes/Team.ts";


export type TUserProvider = {
    user: User
    userTeams: Team[],
    activeTeam: Team,
    setTeam: (activeTeam: Team) => void,
    setPage: (page: TPage) => void
    logUserOut: () => void
    userJoinTeam: () => void
    userCreateTask: () => void
};

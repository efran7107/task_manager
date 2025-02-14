import { useState } from "react";
import { TPage } from "../types/globalTypes";
import "../css/teamEntry.css";
import "../css/UserLogIn.css";
import {
  addUserToTeam,
  createNewTeam,
  validateTeamName,
  varifyTeam,
} from "../functions/apiFunctions";
import toast from "react-hot-toast";
import { UserJoinTeam } from "./team-entry-components/join-team-component";
import { UserCreateTeam } from "./team-entry-components/create-team-component";

const defJoinTeam = {
  teamName: "",
  auth: "",
};

const defCreateTeam = {
  teamName: "",
  auth: "",
  confirm: "",
};

export const TeamEntry = ({ setPage }: { setPage: (page: TPage) => void }) => {
  const [joinTeam, setJoinTeam] = useState(defJoinTeam);

  const [createTeam, setCreateTeam] = useState(defCreateTeam);

  const [teamType, setTeamType] = useState<"join" | "create">("join");

  const changeJoinTeam = (key: string, value: string) => {
    setJoinTeam({ ...joinTeam, [key]: value });
  };

  const changeCreateTeam = (key: string, value: string) => {
    setCreateTeam({ ...createTeam, [key]: value });
  };

  const userJoinTeam = async () => {
    setPage("loading");
    const isTeamVarified = await varifyTeam(joinTeam);
    if (!isTeamVarified) {
      setJoinTeam(defJoinTeam);
      setPage("create/join-team");
      toast.error("sorry, wrong team and/or password");
      return;
    }
    
    await addUserToTeam(joinTeam);
    setPage("home-page");
  };

  const userCreateTeam = async () => {
    setPage("loading");
    for (const val of Object.values(createTeam)) {
      if (val.trim() === "") {
        toast.error("please fill out the form to create a team");
        setPage("create/join-team");
        setCreateTeam(defCreateTeam);
        return;
      }
    }
    const isValidTeamName = validateTeamName(createTeam);
    if (!isValidTeamName) {
      toast.error("sorry, team name is already taken or auth does not match");
      setPage("create/join-team");
      setCreateTeam(defCreateTeam);
      return;
    }
    createNewTeam(createTeam);
    setPage("home-page");
  };

  const teamEntry = () => {
    switch (teamType) {
      case "join":
        userJoinTeam().catch(() => toast.error("sorry, an error occured"));
        break;
      case "create":
        userCreateTeam().catch(() => toast.error("sorry, an error occured"));
    }
  };

  return (
    <div
      className="team-entry-cont"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          teamEntry();
        }
        return;
      }}
      tabIndex={0}
    >
      <div className="join-team" onClick={() => setTeamType("join")}>
        <h2>Join Team</h2>
        <UserJoinTeam joinTeam={joinTeam} changeJoinTeam={changeJoinTeam} />
      </div>
      <div className="create-team" onClick={() => setTeamType("create")}>
        <h2>Create Team</h2>
        <UserCreateTeam
          createTeam={createTeam}
          changeCreateTeam={changeCreateTeam}
        />
      </div>
      <input
        className="submit-btn"
        type="button"
        value="Join/Create Team"
        onClick={teamEntry}
      />
    </div>
  );
};

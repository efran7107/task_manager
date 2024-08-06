import { useState } from "react";
import {
  defaultCreateTeam,
  defaultSignUp,
} from "../../functions/defaultStates";
import { UserInput } from "../inputs/formInputs";

export const SignUpForm = () => {
  const [signUp, setSignUp] = useState(defaultSignUp);
  const [createTeam, setCreateTeam] = useState(defaultCreateTeam);
  const [joinTeamCode, setJoinTeamCode] = useState("");

  const { firstName, lastName, email, newUsername, newPassword, confirm } =
    signUp;
  const { teamName, teamCode } = createTeam;

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <form className="inputs">
        <UserInput
          label="First Name"
          name="firstName"
          userInputProps={{
            type: "text",
            placeholder: "Enter your first name",
            value: firstName,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === firstName) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, firstName: e.currentTarget.value });
            },
          }}
        />
        <UserInput
          label="Last Name"
          name="lastName"
          userInputProps={{
            type: "text",
            placeholder: "Enter your last name",
            value: lastName,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === lastName) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, lastName: e.currentTarget.value });
            },
          }}
        />
        <UserInput
          label="Email"
          name="email"
          userInputProps={{
            type: "text",
            placeholder: "Enter your email",
            value: email,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === email) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, email: e.currentTarget.value });
            },
          }}
        />
        <UserInput
          label="Username"
          name="newUsername"
          userInputProps={{
            type: "text",
            placeholder: "Enter your unique username",
            value: newUsername,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === newUsername) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, newUsername: e.currentTarget.value });
            },
          }}
        />
        <UserInput
          label="Password"
          name="newPassword"
          userInputProps={{
            type: "password",
            placeholder: "Enter your password",
            value: newPassword,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === newPassword) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, newPassword: e.currentTarget.value });
            },
          }}
        />
        <UserInput
          label="Confirm Password"
          name="confirm"
          userInputProps={{
            type: "password",
            placeholder: "Confirm your password",
            value: firstName,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === confirm) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, confirm: e.currentTarget.value });
            },
          }}
        />
        <div className="join-create">
          <h3>Join or create a team</h3>
          <div className="join-team">
            <h4>Join Team</h4>
            <UserInput
              label="Team Code"
              name="joinTeamCode"
              userInputProps={{
                type: "text",
                placeholder: "Enter a code here to join a team",
                value: teamCode,
                onChange: (e) => {
                  if (e.currentTarget.value.trim() === teamCode) {
                    setJoinTeamCode(joinTeamCode);
                    return;
                  }
                  if (teamName !== "") {
                    setCreateTeam(defaultCreateTeam);
                    setJoinTeamCode(e.currentTarget.value);
                    return;
                  }
                  setJoinTeamCode(e.currentTarget.value);
                },
              }}
            />
          </div>
          <div className="create-team">
            <h4>Create Team</h4>
            <UserInput
              label="New Team Name"
              name="teamName"
              userInputProps={{
                type: "text",
                placeholder: "Enter a name for your new team",
                value: teamName,
                onChange: (e) => {
                  if (e.currentTarget.value.trim() === teamName) {
                    setCreateTeam({ ...createTeam, teamName: teamName });
                    return;
                  }
                  if (joinTeamCode !== "") {
                    setJoinTeamCode("");
                    setCreateTeam({
                      ...createTeam,
                      teamName: e.currentTarget.value,
                    });
                    return;
                  }
                  setCreateTeam({
                    ...createTeam,
                    teamName: e.currentTarget.value,
                  });
                },
              }}
            />
            <UserInput
              label="New Team code"
              name="teamCode"
              userInputProps={{
                type: "text",
                placeholder: "Enter a code for your new team",
                value: teamName,
                onChange: (e) => {
                  if (e.currentTarget.value.trim() === teamCode) {
                    setCreateTeam({ ...createTeam, teamCode: teamCode });
                    return;
                  }
                  if (joinTeamCode !== "") {
                    setJoinTeamCode("");
                    setCreateTeam({
                      ...createTeam,
                      teamCode: e.currentTarget.value,
                    });
                    return;
                  }
                  setCreateTeam({
                    ...createTeam,
                    teamCode: e.currentTarget.value,
                  });
                },
              }}
            />
          </div>
        </div>
        <input className="submit" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

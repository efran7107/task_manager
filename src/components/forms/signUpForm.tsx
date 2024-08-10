import { useState } from "react";
import {
  defaultCreateTeam,
  defaultSignUp,
} from "../../functions/defaultStates";
import { ErrorPopUp, UserInput } from "../inputs/formInputs";
import { validations } from "../../functions/validations";
import { useUser } from "../../functions/providersContext";
import { User } from "../../types/objectTypes";
import { format } from "../../functions/formatting";

export const SignUpForm = () => {
  const [signUp, setSignUp] = useState(defaultSignUp);
  const [createTeam, setCreateTeam] = useState(defaultCreateTeam);
  const [joinTeamCode, setJoinTeamCode] = useState("");
  const [isFirstSignUp, setIsFirstSignUp] = useState(true);

  const { allData } = useUser();
  const { users, teams } = allData;
  const { firstName, lastName, email, newUsername, newPassword, confirm } =
    signUp;
  const { teamName, teamCode } = createTeam;

  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <form
        className="inputs"
        onSubmit={(e) => {
          e.preventDefault();

          if (
            !validations.isValidSignUp(signUp, users, createTeam, joinTeamCode)
          ) {
            setIsFirstSignUp(false);
            return;
          }
          const newUser: Omit<User, "id"> = {
            firstName: format.formatName(firstName),
          };
        }}
      >
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
        {!isFirstSignUp && firstName.trim().length < 2 && (
          <ErrorPopUp message="Please enter at least two characters" />
        )}

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
        {!isFirstSignUp && lastName.trim().length < 2 && (
          <ErrorPopUp message="Please enter at least two characters" />
        )}
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
        {!isFirstSignUp && !validations.isValidEmail(email) && (
          <ErrorPopUp message="Please enter a valid email" />
        )}
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
        {!isFirstSignUp &&
          !validations.isSameUsername(newUsername, users) &&
          newUsername.trim().length < 6 && (
            <ErrorPopUp message="Please enter a unique username that is at least 6 charaters long" />
          )}
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
        {!isFirstSignUp && newPassword !== confirm && (
          <ErrorPopUp message="passwords do not match" />
        )}
        <UserInput
          label="Confirm Password"
          name="confirm"
          userInputProps={{
            type: "password",
            placeholder: "Confirm your password",
            value: confirm,
            onChange: (e) => {
              if (e.currentTarget.value.trim() === confirm) {
                setSignUp(signUp);
                return;
              }
              setSignUp({ ...signUp, confirm: e.currentTarget.value });
            },
          }}
        />
        {!isFirstSignUp && newPassword !== confirm && (
          <ErrorPopUp message="passwords do not match" />
        )}
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
                value: joinTeamCode,
                onChange: (e) => {
                  if (e.currentTarget.value.trim() === joinTeamCode) {
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
            {!isFirstSignUp &&
              joinTeamCode.trim().length < 4 &&
              (teamName.trim().length < 2 || teamCode.trim().length < 4) && (
                <ErrorPopUp message="team code must be at least 4 characters" />
              )}
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
            {(!isFirstSignUp && validations.isSameTeamName(teamName, teams)) ||
              (teamName.trim().length < 2 && joinTeamCode.trim().length < 4 && (
                <ErrorPopUp message="team name must be more than 2 characters, and must be a unique team name" />
              ))}
            <UserInput
              label="New Team code"
              name="teamCode"
              userInputProps={{
                type: "text",
                placeholder: "Enter a code for your new team",
                value: teamCode,
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
            {!isFirstSignUp &&
              teamCode.trim().length < 4 &&
              joinTeamCode.trim().length < 4 && (
                <ErrorPopUp message="team code must be at least 4 characters" />
              )}
          </div>
        </div>
        <input className="submit" type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

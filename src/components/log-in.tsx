import "@/styles/log-in.css";
import { useState } from "react";
import { useUser } from "./componentsProvider/UserProvider";
import toast from "react-hot-toast";
import { validations } from "@/functions/validation";
import { transformations } from "@/functions/transformations";
import { UserInput } from "./UserInput";

type DefaultLogIn = {
  username: string;
  password: string;
};

const defaultLogIn: DefaultLogIn = {
  username: "",
  password: "",
};

const defaultRegistration = {
  newUsername: "",
  firstName: "",
  lastName: "",
  email: "",
  newPassword: "",
  confirmPassword: "",
};

export const LogIn = () => {
  const { createUser, userAuth, isExistingUser, isLoading } = useUser();
  const { isValidFormSub, isName, isEmail } = validations;
  const { formatName } = transformations;

  const [isLogInSubmit, setIsLogInSubmit] = useState(false);
  const [isCreateFormSubmit, setIsCreateFormSubmit] = useState(false);

  const [userLogIn, setUserLogIn] = useState(defaultLogIn);

  const [newUser, setNewUser] = useState(defaultRegistration);

  return (
    <>
      <div className="log-in-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (userLogIn.username === "" || userLogIn.password === "") {
              toast.error("Please enter a username and/or password");
              setIsLogInSubmit(true);
              return;
            }
            userAuth(userLogIn.username, userLogIn.password);
            setIsLogInSubmit(false);
            setUserLogIn(defaultLogIn);
          }}
          className="user-entry"
        >
          <h3>Log in</h3>
          <UserInput
            id="username"
            label="Username"
            className="input-group"
            userProps={{
              type: "text",
              className: "form-control",
              name: "username",
              autoComplete: "off",
              value: userLogIn.username,
              onChange: (e) => {
                setUserLogIn({ ...userLogIn, username: e.currentTarget.value });
              },
              disabled: isLoading,
            }}
          />
          {isLogInSubmit && userLogIn.username === "" && (
            <div className="userError">
              <p>Please enter a username</p>
            </div>
          )}
          <UserInput
            id="password"
            label="Password"
            className="input-group"
            userProps={{
              type: "password",
              name: "password",
              autoComplete: "off",
              value: userLogIn.password,
              onChange: (e) => {
                setUserLogIn({ ...userLogIn, password: e.currentTarget.value });
              },
              disabled: isLoading,
            }}
          />
          {isLogInSubmit && userLogIn.password === "" && (
            <div className="userError">
              <p>Please enter a password</p>
            </div>
          )}
          <input
            className="form-btn"
            type="submit"
            value="Log In"
            disabled={isLoading}
          />
        </form>
        <h3 className="user-register-heading">New to Task Manager?</h3>
        <form
          className="user-entry"
          onSubmit={(e) => {
            e.preventDefault();
            if (isValidFormSub(newUser)) {
              toast.error("Please fill out all fields on the form");
              setIsCreateFormSubmit(true);
              return;
            } else if (isExistingUser(newUser.newUsername)) {
              toast.error("user already exists");
              setIsCreateFormSubmit(true);
              return;
            }
            createUser(
              {
                name: formatName(newUser.firstName, newUser.lastName),
                username: newUser.newUsername,
                email: newUser.email,
              },
              newUser.newPassword
            );
            toast.success("User created successfully");
            setIsCreateFormSubmit(false);
            setNewUser(defaultRegistration);
          }}
        >
          <h3>Sign up</h3>
          <UserInput
            id="createUserName"
            label="Create Username"
            className="input-group"
            userProps={{
              type: "text",
              name: "createUsername",
              autoComplete: "off",
              value: newUser.newUsername,
              onChange: (e) => {
                setNewUser({ ...newUser, newUsername: e.currentTarget.value });
              },
              disabled: isLoading,
            }}
          />
          {isCreateFormSubmit && newUser.newUsername === "" && (
            <div className="userError">
              <p>Please enter a username</p>
            </div>
          )}
          <UserInput
            id="firstName"
            label="First Name"
            className="input-group"
            userProps={{
              type: "text",
              name: "firstName",
              autoComplete: "off",
              value: newUser.firstName,
              onChange: (e) => {
                setNewUser({ ...newUser, firstName: e.currentTarget.value });
              },
            }}
          />
          {isCreateFormSubmit &&
            (newUser.firstName === "" || !isName(newUser.firstName)) && (
              <div className="userError">
                <p>Please enter a first name</p>
              </div>
            )}
          <UserInput
            id="lastName"
            label="Last Name"
            className="input-group"
            userProps={{
              type: "text",
              name: "lastName",
              id: "lastName",
              autoComplete: "off",
              value: newUser.lastName,
              onChange: (e) => {
                setNewUser({ ...newUser, lastName: e.currentTarget.value });
              },
              disabled: isLoading,
            }}
          />
          {isCreateFormSubmit &&
            (newUser.lastName === "" || !isName(newUser.lastName)) && (
              <div className="userError">
                <p>Please enter a last name</p>
              </div>
            )}
          <UserInput
            id="email"
            label="Email"
            className="input-group"
            userProps={{
              type: "email",
              name: "email",
              id: "email",
              autoComplete: "off",
              value: newUser.email,
              onChange: (e) => {
                setNewUser({ ...newUser, email: e.currentTarget.value });
              },
              disabled: isLoading,
            }}
          />
          {isCreateFormSubmit &&
            (newUser.email === "" || !isEmail(newUser.email)) && (
              <div className="userError">
                <p>Please enter a email</p>
              </div>
            )}
          <UserInput
            id="createPassword"
            label="Crate Password"
            className="input-group"
            userProps={{
              type: "password",
              name: "createPassword",
              id: "createPassword",
              autoComplete: "off",
              value: newUser.newPassword,
              onChange: (e) => {
                setNewUser({ ...newUser, newPassword: e.currentTarget.value });
              },
              disabled: isLoading,
            }}
          />
          {isCreateFormSubmit && newUser.newPassword === "" && (
            <div className="userError">
              <p>Please enter a password</p>
            </div>
          )}
          <UserInput
            id="confirmPassword"
            label="Confirm Password"
            className="input-group"
            userProps={{
              type: "password",
              name: "confirmPassword",
              id: "confirmPassword",
              autoComplete: "off",
              value: newUser.confirmPassword,
              onChange: (e) => {
                setNewUser({
                  ...newUser,
                  confirmPassword: e.currentTarget.value,
                });
              },
              disabled: isLoading,
            }}
          />
          {isCreateFormSubmit &&
            newUser.confirmPassword !== newUser.newPassword && (
              <div className="userError">
                <p>password does not match</p>
              </div>
            )}
          <input
            className="form-btn"
            type="submit"
            value="Crate Account"
            disabled={isLoading}
          />
        </form>
      </div>
    </>
  );
};

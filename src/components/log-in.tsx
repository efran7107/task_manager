import "@/styles/log-in.css";
import { useState } from "react";
import { useUser } from "./componentsProvider/UserProvider";
import { isEmail, isName } from "@/functions/validation";

export const LogIn = () => {
  const { createUser } = useUser();

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [newUser, setNewUser] = useState({
    newUsername: "",
    firstName: "",
    lastName: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  return (
    <>
      <div className="log-in-container">
        <form action="" className="user-entry">
          <h3>Log in</h3>
          <div className="input-group">
            <label htmlFor="username" className="form-label">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              autoComplete="off"
              value={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.currentTarget.value });
              }}
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              value={user.password}
              onChange={(e) => {
                setUser({ ...user, password: e.currentTarget.value });
              }}
            />
          </div>
          <input type="submit" value="Log In" />
        </form>
        <h3 className="user-register-heading">New to Task Manager?</h3>
        <form
          className="user-entry"
          onSubmit={(e) => {
            e.preventDefault();

            if (
              !isName(newUser.firstName) &&
              !isName(newUser.lastName) &&
              isEmail(newUser.email) &&
              newUser.newPassword === newUser.confirmPassword
            )
              return;

            createUser(
              {
                name: `${
                  newUser.firstName.charAt(0).toUpperCase() +
                  newUser.firstName.slice(1)
                } ${
                  newUser.lastName.charAt(0).toUpperCase() +
                  newUser.lastName.slice(1)
                }`,
                username: newUser.newUsername,
                email: newUser.email,
              },
              newUser.newPassword
            );
          }}
        >
          <h3>Sign up</h3>
          <div className="input-group">
            <label htmlFor="createUserName">Create Username: </label>
            <input
              type="text"
              name="createUsername"
              id="createUsername"
              autoComplete="off"
              value={newUser.newUsername}
              onChange={(e) => {
                setNewUser({ ...newUser, newUsername: e.currentTarget.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="firstName">First Name: </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              autoComplete="off"
              value={newUser.firstName}
              onChange={(e) => {
                setNewUser({ ...newUser, firstName: e.currentTarget.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name: </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              autoComplete="off"
              value={newUser.lastName}
              onChange={(e) => {
                setNewUser({ ...newUser, lastName: e.currentTarget.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              value={newUser.email}
              onChange={(e) => {
                setNewUser({ ...newUser, email: e.currentTarget.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="createPassword">Create Password: </label>
            <input
              type="password"
              name="createPassword"
              id="createPassword"
              autoComplete="off"
              value={newUser.newPassword}
              onChange={(e) => {
                setNewUser({ ...newUser, newPassword: e.currentTarget.value });
              }}
            />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="off"
              value={newUser.confirmPassword}
              onChange={(e) => {
                setNewUser({
                  ...newUser,
                  confirmPassword: e.currentTarget.value,
                });
              }}
            />
          </div>
          <input type="submit" value="Crate Account" />
        </form>
      </div>
    </>
  );
};

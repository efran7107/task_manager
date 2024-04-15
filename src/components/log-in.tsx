import "@/styles/log-in.css";

export const LogIn = () => {
  return (
    <>
      <div className="log-in-container">
        <form action="" className="user-entry">
          <h3>Log in</h3>
          <div className="input-group">
            <label htmlFor="username" className="form-label">
              Username:{" "}
            </label>
            <input
              type="text"
              className="form-control"
              name="username"
              id="username"
              autoComplete="off"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" />
          </div>
          <input type="submit" value="Log In" />
        </form>
        <h3 className="user-register-heading">New to Task Manager?</h3>
        <form action="" className="user-entry">
          <h3>Sign up</h3>
          <div className="input-group">
            <label htmlFor="createUserName">Create Username: </label>
            <input type="text" name="createUsername" id="createUsername" />
          </div>

          <div className="input-group">
            <label htmlFor="firstName">First Name: </label>
            <input type="text" name="firstName" id="firstName" />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name: </label>
            <input type="text" name="lastName" id="lastName" />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" />
          </div>

          <div className="input-group">
            <label htmlFor="createPassword">Create Password: </label>
            <input type="password" name="createPassword" id="createPassword" />
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password: </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
          </div>
          <input type="submit" value="Crate Account" />
        </form>
      </div>
    </>
  );
};

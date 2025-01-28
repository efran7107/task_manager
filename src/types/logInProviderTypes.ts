export type TLogInProvider = {
  logIn: LogInInput;
  setLogIn: (logIn: LogInInput) => void;
};

export type LogInInput = {
  username: string;
  password: string;
};

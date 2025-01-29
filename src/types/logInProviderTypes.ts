export type tgroup = 'log-in' | 'sign-up';

export type TLogInProvider = {
  logIn: LogInInput;
  setLogIn: (logIn: LogInInput) => void;
  signUp: SignUpInput;
  setSignUp: (signUp: SignUpInput) => void;
  resetInfo: (group: tgroup) => void;
  signUserIn: () => boolean;
};

export type LogInInput = {
  username: string;
  password: string;
};

export type SignUpInput = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirm: string;
}

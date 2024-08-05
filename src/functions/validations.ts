const isUserLoggedIn = (): boolean => {
  return localStorage.getItem("user") === null ? false : true;
};

const isValidLogIn = ({
  username,
  password,
}: {
  username: string;
  password: string;
}): boolean => {
  return username !== "" && password !== "" ? true : false;
};

export const validations = {
  isUserLoggedIn,
  isValidLogIn,
};

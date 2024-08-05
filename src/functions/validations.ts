const isUserLoggedIn = (): boolean => {
  return localStorage.getItem("user") === null ? false : true;
};

export const validations = {
  isUserLoggedIn,
};

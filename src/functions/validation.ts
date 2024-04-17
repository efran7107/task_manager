export const isName = (name: string) => {
  return !/\d/.test(name);
};

export const isEmail = (email: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!email?.match(regex);
};

export const isValidFormSub = (newUser: {
  newUsername: string;
  firstName: string;
  lastName: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}): boolean => {
  if (
    newUser.newUsername === "" ||
    newUser.firstName === "" ||
    newUser.lastName === "" ||
    newUser.email === "" ||
    newUser.newPassword === "" ||
    newUser.confirmPassword === "" ||
    !isName(newUser.firstName) ||
    !isName(newUser.lastName) ||
    !isEmail(newUser.email)
  )
    return true;
  else return false;
};

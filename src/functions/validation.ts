export const isName = (name: string) => {
  return !/\d/.test(name);
};

export const isEmail = (email: string) => {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!email?.match(regex);
};

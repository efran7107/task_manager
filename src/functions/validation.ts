import { TaskAssinmentLink } from "@/types/types";

const isName = (name: string) => {
  return !/\d/.test(name);
};

const isEmail = (email: string) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return !!email?.match(regex);
};

const isValidFormSub = (newUser: {
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

const isPastDue = (date: string, taskDate: string): boolean => {
  const today = new Date(date);
  const dueDate = new Date(taskDate);
  return today > dueDate;
};

const isNoteNotEmpty = (noteTitle: string, noteDesc: string) => {
  return noteTitle.trim().length === 0 || noteDesc.trim().length === 0;
};



export const validations = {
  isName,
  isEmail,
  isValidFormSub,
  isPastDue,
  isNoteNotEmpty,
};

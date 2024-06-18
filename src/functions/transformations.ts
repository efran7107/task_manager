import { TeamMember } from "@/types/types";

const formatName = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0).toUpperCase() + firstName.slice(1)} ${
    lastName.charAt(0).toUpperCase() + lastName.slice(1)
  }`;
};

const moveToFront = (LeaderId: number, users: TeamMember[]): TeamMember[] => {
  const index = users.findIndex(({ id }) => id === LeaderId);
  if (index !== -1) {
    const updateUsers = [...users];
    updateUsers.unshift(...updateUsers.splice(index, 1));
    return updateUsers;
  }
  return users;
};

export const transformations = {
  formatName,
  moveToFront,
};

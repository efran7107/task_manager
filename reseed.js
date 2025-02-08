import * as fs from "fs";

const newData = {
  teams: [
    {
      id: 0,
      name: "Team 1",
      teamLeadId: 0,
      numOfMembers: 2,
    },
    {
      id: 1,
      name: "Team 2",
      teamLeadId: 1,
      numOfMembers: 2,
    },
  ],
  teamAuths: [
    {
      id: 0,
      teamId: 0,
      auth: "1234",
    },
    {
      id: 1,
      teamId: 1,
      auth: "5678",
    },
  ],
  teamMembers: [
    {
      id: 0,
      name: "Ernest Franssen",
      email: "Email@email.com",
      username: "efran7107",
    },
    {
      id: 1,
      name: "Mary Franssen",
      email: "email@email.co",
      username: "mfran9305",
    },
  ],
  userAuths: [
    {
      id: 0,
      userId: 0,
      password: "1234",
    },
    {
      id: 1,
      userId: 1,
      password: "5678",
    },
  ],
  memTeamLinks: [
    {
      id: 0,
      userId: 0,
      teamId: 0,
    },
    {
      id: 1,
      userId: 1,
      teamId: 0,
    },
    {
      id: 2,
      userId: 0,
      teamId: 1,
    },
    {
      id: 3,
      userId: 1,
      teamId: 1,
    },
  ],
};

fs.writeFile(
  "server/TM.json",
  JSON.stringify(newData, null, 2),
  "utf-8",
  (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log("File written successfully!");
    }
  }
);

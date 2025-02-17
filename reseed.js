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
  tasks: [
    {
      id: 0,
      title: 'task 1',
      desc: 'task 1',
      isUrgent: false,
      author: 'efran7107',
      status: 'to-do',
      creationDate: '2025-01-01',
      dueDate: '2025-02-28',
      teamId: 0,
    },
    {
      id: 1,
      title: 'task 2',
      desc: 'task 2',
      isUrgent: true,
      author: 'mfran9305',
      status: 'doing',
      creationDate: '2025-01-01',
      dueDate: '2025-02-28',
      teamId: 1,
    },
    {
      id: 2,
      title: 'task 3',
      desc: 'task 3',
      isUrgent: false,
      author: 'mfran9305',
      status: 'done',
      creationDate: '2025-01-01',
      dueDate: '2025-02-28',
      teamId: 0,
    },
  ],
  taskLinks: [
    {
      id: 0,
      taskId: 0,
      teamMemberId: 0
    },
    {
      id: 1,
      taskId: 1,
      teamMemberId: 1
    },
    {
      id: 2,
      taskId: 0,
      teamMemberId: 1
    },
  ],
  notes: [
    {
      id: 0,
      title: 'test 1',
      desc: 'test 1',
      date: '2025-02-01',
      taskId: 0,
      authId: 0,
    },
    {
      id: 1,
      title: 'test 2',
      desc: 'test 2',
      date: '2025-02-02',
      taskId: 1,
      authId: 1
    }
  ]
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

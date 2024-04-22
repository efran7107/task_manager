import { writeFileSync } from "fs";

const db = {
  teams: [
    {
      id: 0,
      teamName: "Team 1",
      teamLeaderId: 0,
    },
    {
      id: 1,
      teamName: "Team 1",
      teamLeaderId: 1,
    },
  ],
  teamMembers: [
    {
      id: 0,
      name: "John Doe",
      username: "johnDoe",
      email: "johnDoe@email.com",
    },
    {
      id: 1,
      name: "Jane Doe",
      username: "janeDoe",
      email: "janeDoe@email.com",
    },
  ],
  teamMemberAuth: [
    {
      id: 0,
      teamMemberId: 0,
      password: "password1234",
    },
    {
      id: 1,
      teamMemberId: 1,
      password: "password5678",
    },
  ],
  teamMemberTeamsLink: [
    {
      id: 0,
      TeamId: 0,
      teamMemberId: 0,
    },
    {
      id: 1,
      TeamId: 1,
      teamMemberId: 1,
    },
    {
      id: 2,
      TeamId: 0,
      teamMemberId: 1,
    },
    {
      id: 3,
      TeamId: 1,
      teamMemberId: 0,
    },
  ],
  tasks: [
    {
      id: 0,
      taskName: "Task 1",
      description: "test 1",
      status: "to-do",
      dueDate: "1/1/25",
      isImportant: false,
    },
  ],
  taskAssignmentLink: [
    {
      id: 0,
      teamMemberId: 0,
      taskId: 0,
    },
    {
      id: 1,
      teamMemberId: 1,
      taskId: 0,
    },
  ],
  tags: [
    {
      id: 0,
      tagName: "#tag1",
    },
  ],
  taskTagLink: [
    {
      id: 0,
      tagId: 0,
      taskId: 0,
    },
  ],
  notes: [
    {
      id: 0,
      content: "note 1",
      teamMemberId: 0,
      taskId: 0,
    },
  ],
};

writeFileSync("./config/taskManagerData.json", JSON.stringify(db), {
  encoding: "utf-8",
});

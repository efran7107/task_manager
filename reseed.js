import { writeFileSync } from "fs";

const db = {
  teams: [
    {
      id: 0,
      teamName: "Team 1",
    },
    {
      id: 1,
      teamName: "Team 2",
    },
    {
      id: 2,
      teamName: "Team 3",
    },
    {
      id: 3,
      teamName: "Team 4",
    },
    {
      id: 4,
      teamName: "Team 5",
    },
    {
      id: 5,
      teamName: "Team 6",
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
    {
      id: 2,
      name: "Test Dummy",
      username: "test",
      email: "test@email.com",
    },
    {
      id: 3,
      name: "Harry Potter",
      username: "potter",
      email: "harry@hogwarts.com",
    },
    {
      id: 4,
      name: "Wade Wilson",
      username: "Deadpool",
      email: "wilsonWade@email.com",
    },
    {
      id: 5,
      name: "Logan lastname",
      username: "wolverine",
      email: "logan@email.com",
    },
  ],
  teamMemberAuth: [
    {
      id: 0,
      teamMemberId: 0,
      password: "1234",
    },
    {
      id: 1,
      teamMemberId: 1,
      password: "5678",
    },
    {
      id: 2,
      teamMemberId: 2,
      password: "test",
    },
    {
      id: 3,
      teamMemberId: 3,
      password: "voldemort",
    },
    {
      id: 4,
      teamMemberId: 4,
      password: "maximumEffort",
    },
    {
      id: 5,
      teamMemberId: 5,
      password: "bub",
    },
  ],
  teamMemberTeamsLink: [
    {
      id: 0,
      teamId: 0,
      teamMemberId: 0,
    },
    {
      id: 1,
      teamId: 0,
      teamMemberId: 1,
    },
    {
      id: 2,
      teamId: 0,
      teamMemberId: 2,
    },
    {
      id: 3,
      teamId: 0,
      teamMemberId: 3,
    },
    {
      id: 4,
      teamId: 0,
      teamMemberId: 4,
    },
    {
      id: 5,
      teamId: 0,
      teamMemberId: 5,
    },

    {
      id: 6,
      teamId: 1,
      teamMemberId: 0,
    },
    {
      id: 7,
      teamId: 1,
      teamMemberId: 1,
    },
    {
      id: 8,
      teamId: 1,
      teamMemberId: 2,
    },
    {
      id: 9,
      teamId: 1,
      teamMemberId: 3,
    },
    {
      id: 10,
      teamId: 1,
      teamMemberId: 4,
    },
    {
      id: 11,
      teamId: 1,
      teamMemberId: 5,
    },

    {
      id: 12,
      teamId: 2,
      teamMemberId: 2,
    },
    {
      id: 13,
      teamId: 3,
      teamMemberId: 3,
    },
    {
      id: 14,
      teamId: 4,
      teamMemberId: 4,
    },
    {
      id: 15,
      teamId: 5,
      teamMemberId: 5,
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
    {
      id: 1,
      taskName: "Task 2",
      description: "test 2",
      status: "to-do",
      dueDate: "1/1/25",
      isImportant: false,
    },
    {
      id: 2,
      taskName: "Task 3",
      description: "test 3",
      status: "to-do",
      dueDate: "1/1/25",
      isImportant: false,
    },
    {
      id: 3,
      taskName: "Task 4",
      description: "test 4",
      status: "to-do",
      dueDate: "1/1/25",
      isImportant: false,
    },
    {
      id: 4,
      taskName: "Task 5",
      description: "test 5",
      status: "to-do",
      dueDate: "1/1/25",
      isImportant: false,
    },
    {
      id: 5,
      taskName: "Task 6",
      description: "test 6",
      status: "to-do",
      dueDate: "1/1/25",
      isImportant: false,
    },
    {
      id: 6,
      taskName: "Task 6",
      description: "test 6",
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
      taskId: 1,
    },
    {
      id: 2,
      teamMemberId: 2,
      taskId: 2,
    },
    {
      id: 3,
      teamMemberId: 3,
      taskId: 3,
    },
    {
      id: 4,
      teamMemberId: 4,
      taskId: 4,
    },
    {
      id: 5,
      teamMemberId: 5,
      taskId: 5,
    },
    {
      id: 6,
      teamMemberId: 0,
      taskId: 1,
    },
    {
      id: 7,
      teamMemberId: 1,
      taskId: 1,
    },
    {
      id: 8,
      teamMemberId: 2,
      taskId: 1,
    },
    {
      id: 9,
      teamMemberId: 3,
      taskId: 1,
    },
    {
      id: 10,
      teamMemberId: 4,
      taskId: 1,
    },
  ],
  tags: [
    {
      id: 0,
      tagName: "#tag1",
    },
    {
      id: 1,
      tagName: "#tag2",
    },
    {
      id: 2,
      tagName: "#tag3",
    },
  ],
  taskTagLink: [
    {
      id: 0,
      tagId: 0,
      taskId: 0,
    },
    {
      id: 1,
      tagId: 1,
      taskId: 0,
    },
    {
      id: 2,
      tagId: 2,
      taskId: 0,
    },
    {
      id: 3,
      tagId: 0,
      taskId: 1,
    },
    {
      id: 4,
      tagId: 1,
      taskId: 1,
    },
    {
      id: 5,
      tagId: 2,
      taskId: 1,
    },
    {
      id: 6,
      tagId: 0,
      taskId: 2,
    },
    {
      id: 7,
      tagId: 1,
      taskId: 2,
    },
    {
      id: 8,
      tagId: 2,
      taskId: 2,
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

import { Component } from "react";
import { Tag, TaggedTask, Task, User } from "../../types/objectTypes";
import { useUser } from "../../functions/providersContext";

export const TaskDisplay = ({
  toDo,
  doing,
  done,
  users,
}: {
  toDo: Task[];
  doing: Task[];
  done: Task[];
  users: User[];
}) => {
  const { allData } = useUser();
  const { taggedTasks, tags } = allData;
  return (
    <>
      <div className="task-row to-do">
        <h3>to-do</h3>
        {toDo.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              taggedTasks={taggedTasks}
              tags={tags}
            />
          );
        })}
      </div>
      <hr />
      <div className="task-row doing">
        <h3>doing</h3>
        {doing.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              taggedTasks={taggedTasks}
              tags={tags}
            />
          );
        })}
      </div>
      <hr />
      <div className="task-row done">
        <h3>done</h3>
        {done.map((task) => {
          return (
            <TaskCard
              key={task.id}
              task={task}
              users={users}
              taggedTasks={taggedTasks}
              tags={tags}
            />
          );
        })}
      </div>
    </>
  );
};

class TaskCard extends Component<{
  task: Task;
  users: User[];
  taggedTasks: TaggedTask[];
  tags: Tag[];
}> {
  render() {
    const { task, users, taggedTasks, tags } = this.props;
    const { title, desc, status, dueDate, isUrgent, ucId } = task;
    const taskCreater = users.find((user) => user.id === ucId)!;
    const taggedTask = taggedTasks.filter((link) => link.taskId === task.id);
    const taskTags = taggedTask.map((link) => {
      const tag = tags.find((tag) => tag.id === link.tagId);
      return tag;
    });

    console.log(taskTags);

    return (
      <div className="task">
        {isUrgent && <i className="fa-solid fa-exclamation"></i>}
        <h4>{title}</h4>
        <div className="task-details">
          <p>{desc}</p>
          <p>{status}</p>
          <p>{dueDate}</p>
          <p>{taskCreater.username}</p>
          <div className="tags">
            {taskTags.map((tag) => (
              <p key={tag?.id}>{tag?.tag}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

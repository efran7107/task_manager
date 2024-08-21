import { Component } from "react";
import { Task, User } from "../../types/objectTypes";

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
  return (
    <>
      <div className="task-row to-do">
        <h3>to-do</h3>
        {toDo.map((task) => {
          return <TaskCard key={task.id} task={task} users={users} />;
        })}
      </div>
      <hr />
      <div className="task-row doing">
        <h3>doing</h3>
        {doing.map((task) => {
          return <TaskCard key={task.id} task={task} users={users} />;
        })}
      </div>
      <hr />
      <div className="task-row done">
        <h3>done</h3>
        {done.map((task) => {
          return <TaskCard key={task.id} task={task} users={users} />;
        })}
      </div>
    </>
  );
};

class TaskCard extends Component<{ task: Task; users: User[] }> {
  render() {
    const { task, users } = this.props;
    const { title, desc, status, dueDate, isUrgent, ucId } = task;
    const taskCreater = users.find((user) => user.id === ucId)!;
    this.props.task;
    return (
      <div className="task">
        {isUrgent && <i className="fa-solid fa-exclamation"></i>}
        <h4>{title}</h4>
        <div className="task-details">
          <p>{desc}</p>
          <p>{status}</p>
          <p>{dueDate}</p>
          <p>{taskCreater.username}</p>
        </div>
      </div>
    );
  }
}


import {useUser} from "../../functions/providersContext.ts";
import {useEffect, useState} from "react";
import {TaskCard} from "./task.tsx";
import {Task} from "../../classes/Task.ts";

export function TaskDisplay() {
    const {activeTeam, user} = useUser()
    const tasks = activeTeam.getTasks()
    const userTasks = activeTeam.getUserTaskLinks(user.getId())
    const [filter, setFilter] = useState<Task[]>([])

    useEffect(() => {
        setFilter(tasks)
    }, [tasks]);

    return (
        <div className='task-display'>
            <div className="filter-bar">
                <div className="options">
                    <p className={`filter ${filter === tasks ? 'filtered' : ''}`} onClick={() => setFilter(tasks)}>Team Tasks</p>
                    <p className={`filter ${filter === userTasks ? 'filtered' : ''}`} onClick={() => setFilter(userTasks)}>Your Team Tasks</p>
                </div>
            </div>
            <hr/>
            <div className="tasks">
                <div className="task-section to-do">
                    <h3>To-Do: </h3>
                    <div className="task-column">
                        {filter.filter(task => task.getTask().status === 'to-do')
                            .map((task) => (
                                <TaskCard key={task.getId()} task={task}/>
                            ))}
                    </div>
                </div>
                <hr/>
                <div className="task-section doing">
                    <h3>Doing: </h3>
                    <div className="task-column">
                        {filter.filter(task => task.getTask().status === 'doing')
                            .map((task) => (
                                <TaskCard key={task.getId()} task={task}/>
                            ))}
                    </div>
                </div>
                <hr/>
                <div className="task-section done">
                    <h3>Done: </h3>
                    <div className="task-column">
                        {filter.filter(task => task.getTask().status === 'done')
                            .map((task) => (
                                <TaskCard key={task.getId()} task={task}/>
                            ))}
                    </div>
                </div>
            </div>

        </div>
    )

}
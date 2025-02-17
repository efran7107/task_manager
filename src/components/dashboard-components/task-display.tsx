
import {useUser} from "../../functions/providersContext.ts";
import {useEffect, useState} from "react";
import {TaskCard} from "./task.tsx";
import {Task} from "../../classes/Task.ts";
import {TaskModal} from "./taskModal.tsx";

export function TaskDisplay() {
    const {activeTeam, user} = useUser()
    const tasks = activeTeam.getTasks()
    const userTasks = activeTeam.getUserTaskLinks(user.getId())
    const [filter, setFilter] = useState<Task[]>([])
    const [activeTask, setActiveTask] = useState<Task | undefined>()

    const setUserFilter = (filter: string) => {
        setFilter(filter === 'tasks' ? tasks : userTasks)
        localStorage.setItem('filter', filter)
    }
    
    useEffect(() => {
        const filter = localStorage.getItem('filter')
        if(!filter) {
            setFilter(tasks)
            localStorage.setItem('filter', 'tasks')
            return
        }
        setFilter(filter === 'tasks' ? tasks : userTasks)
    }, [tasks]);
    
    return (
        <div className='task-display'>
            <div className="filter-bar">
                <div className="options">
                    <p className={`filter ${filter === tasks ? 'filtered' : ''}`} onClick={() => setUserFilter('tasks')}>Team Tasks</p>
                    <p className={`filter
                    ${filter !== tasks ? 'filtered' : ''}`}
                       onClick={() => setUserFilter('userTasks')}>Your Team Tasks</p>
                </div>
            </div>
            <hr/>
            <div className="tasks">
                <div className="task-section to-do">
                    <h3>To-Do: </h3>
                    <div className="task-column">
                        {filter.filter(task => task && task.getTask().status === 'to-do')
                            .map((task) => task && (
                                <TaskCard
                                  key={task.getId()}
                                  task={task}
                                  setActiveTask={setActiveTask}
                                />
                            ))}
                    </div>
                </div>
                <hr/>
                <div className="task-section doing">
                    <h3>Doing: </h3>
                    <div className="task-column">
                        {filter.filter(task => task && task.getTask().status === 'doing')
                            .map((task) => task && (
                                <TaskCard
                                  key={task.getId()}
                                  task={task}
                                  setActiveTask={setActiveTask}
                                />
                            ))}
                    </div>
                </div>
                <hr/>
                <div className="task-section done">
                    <h3>Done: </h3>
                    <div className="task-column">
                        {filter.filter(task => task && task.getTask().status === 'done')
                            .map((task) => task && (
                                <TaskCard
                                  key={task.getId()}
                                  task={task}
                                  setActiveTask={setActiveTask}
                                />
                            ))}
                    </div>
                </div>
            </div>
            {activeTask && <TaskModal task={activeTask} setTask={setActiveTask}/>}
        </div>
    )

}
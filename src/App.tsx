import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "React", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterTypes>("all")


    const removeTask = (id: number) => {
        return setTasks(tasks.filter((task) => task.id !== id))
    }

    const changeFilter = (filter: FilterTypes) => {
        setFilter(filter)
    }

    let tasksForTodolist = tasks
    if (filter === "active") {
        tasksForTodolist = tasks.filter((task) => task.isDone === false)
    }

    if (filter === "completed") {
        tasksForTodolist = tasks.filter((task) => task.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterTypes = "all" | "active" | "completed"

export default App;

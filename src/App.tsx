import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

function App() {

    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "React", isDone: false},
    ])

    let [filter, setFilter] = useState<FilterTypes>("all")


    const removeTask = (id: string) => {
        return setTasks(tasks.filter((task) => task.id !== id))
    }

    const changeFilter = (filter: FilterTypes) => {
        setFilter(filter)
    }

    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title, isDone: false}
        setTasks([newTask, ...tasks])
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
                      addTask={addTask}
            />
        </div>
    );
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterTypes = "all" | "active" | "completed"

export default App;

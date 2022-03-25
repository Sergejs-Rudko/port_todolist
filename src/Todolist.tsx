import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterTypes, TaskType} from "./App";

export const Todolist = (props: PropsType) => {

    let [newTaskTitle, setNewTaskTitle] = useState("")

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }

    const onAddTaskViaEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const addTask = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle("")
    }

    const onAllFilter = () => {
        props.changeFilter("all")
    }

    const onActiveFilter = () => {
        props.changeFilter("active")
    }

    const onCompletedFilter = () => {
        props.changeFilter("completed")
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onAddTaskViaEnterHandler}/>
            <button onClick={() =>
                addTask()
            }>Add task
            </button>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }
                        return <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllFilter}>all</button>
                <button onClick={onActiveFilter}>active</button>
                <button onClick={onCompletedFilter}>completed</button>
            </div>
        </div>
    )
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: string) => void
    changeFilter: (filter: FilterTypes) => void
    addTask: (title: string) => void
}
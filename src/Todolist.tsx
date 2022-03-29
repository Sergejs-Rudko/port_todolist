import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterTypes, TaskType} from "./App";

export const Todolist = (props: PropsType) => {
    const {filter} = props

    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const onAddTaskViaEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    const addTask = () => {
        if (newTaskTitle.trim().length === 0) {
            setNewTaskTitle("")
            setError(true)
            return
        }
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
                   onKeyPress={onAddTaskViaEnterHandler}
                   className={error ? "error" : ""}/>
            <button onClick={() =>
                addTask()
            }>Add task
            </button>
            {error && <div className={"errorMessage"}>Title is required</div>}
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveHandler = () => {
                            props.removeTask(task.id)
                        }
                        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked)
                        }

                        return <li key={task.id}><input type="checkbox" checked={task.isDone}
                                                        onChange={onCheckboxChangeHandler}/>
                            <span className={task.isDone ? "taskIsDone" : ""}>{task.title}</span>
                            <button onClick={onRemoveHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={onAllFilter} className={filter === "all" ? "activeFilter" : ""}>all</button>
                <button onClick={onActiveFilter} className={filter === "active" ? "activeFilter" : ""}>active</button>
                <button onClick={onCompletedFilter} className={filter === "completed" ? "activeFilter" : ""}>completed
                </button>
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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterTypes
}
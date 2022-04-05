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
        props.addTask(newTaskTitle, props.id)
        setNewTaskTitle("")
    }

    const onAllFilter = () => {
        props.changeFilter("all", props.id)
    }

    const onActiveFilter = () => {
        props.changeFilter("active", props.id)
    }

    const onCompletedFilter = () => {
        props.changeFilter("completed", props.id)
    }


    return (
        <div>

            <h3>{props.title}  <button onClick={() => props.removeTodolist(props.id)}>x</button></h3>

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
                            props.removeTask(task.id, props.id)
                        }
                        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
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
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (filter: FilterTypes, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistID: string) => void
    filter: FilterTypes
    removeTodolist: (id: string) => void
}
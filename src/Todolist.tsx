import React from "react";
import {FilterTypes, TaskType} from "./App";

export const Todolist = (props: PropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <input type="text"/>
            <button>Add task</button>
            <ul>
                {
                    props.tasks.map((task) => {
                        return <li><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
                            <button onClick={() => props.removeTask(task.id)}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button onClick={() => props.changeFilter("all")}>all</button>
                <button onClick={() => props.changeFilter("active")}>active</button>
                <button onClick={() => props.changeFilter("completed")}>completed</button>
            </div>
        </div>
    )
}

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (id: number) => void
    changeFilter: (filter: FilterTypes) => void
}
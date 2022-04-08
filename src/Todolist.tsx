import React, {ChangeEvent} from "react";
import {FilterTypes, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

export const Todolist = (props: PropsType) => {
    const {filter} = props

    const onAllFilter = () => {
        props.changeFilter("all", props.id)
    }

    const onActiveFilter = () => {
        props.changeFilter("active", props.id)
    }

    const onCompletedFilter = () => {
        props.changeFilter("completed", props.id)
    }

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const changeTodolistTitle = (title : string) => {
        props.changeTodolistTitle(props.id,title)
    }




    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={(title)=> {changeTodolistTitle(title)}}/>
                <button onClick={() => props.removeTodolist(props.id)}>x</button>
            </h3>


            <AddItemForm addItem={addTask}/>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }

                        const changeTaskTitle = (title : string) => {
                            props.changeTaskTitle(props.id,task.id,title)
                        }

                        return <li key={task.id}><input type="checkbox" checked={task.isDone}
                                                        onChange={onCheckboxChangeHandler}/>
                            <EditableSpan title={task.title} changeItemTitle={(title)=> changeTaskTitle(title)}/>
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
    changeTaskTitle : (todolistID : string, id : string, newTitle : string) => void
    changeTodolistTitle : (id : string, newTitle : string) => void
}



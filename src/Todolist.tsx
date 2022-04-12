import React, {ChangeEvent} from "react";
import {FilterTypes, TaskType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./Todolist.module.css"


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

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeItemTitle={(title) => {
                    changeTodolistTitle(title)
                }}/>
                <IconButton onClick={() => props.removeTodolist(props.id)}>
                    <DeleteIcon color={"secondary"}/>
                </IconButton>
            </h3>


            <AddItemForm addItem={addTask} addLabel={"Add task"}/>
            <ul>
                {
                    props.tasks.map((task) => {
                        const onRemoveHandler = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const onCheckboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
                        }

                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(props.id, task.id, title)
                        }

                        return <li className={styles.task} key={task.id}><Checkbox checked={task.isDone}
                                                                                   onChange={onCheckboxChangeHandler}/>
                            <EditableSpan title={task.title} changeItemTitle={(title) => changeTaskTitle(title)}/>
                            <IconButton onClick={onRemoveHandler}>
                                <DeleteIcon color={"secondary"}/>
                            </IconButton>
                        </li>
                    })
                }
            </ul>
            <div>
                <Button onClick={onAllFilter} color={filter === "all" ? "success" : "primary"}
                        variant={filter === "all" ? "outlined" : "text"}>all</Button>
                <Button onClick={onActiveFilter} color={filter === "active" ? "success" : "primary"}
                        variant={filter === "active" ? "outlined" : "text"}>active</Button>
                <Button onClick={onCompletedFilter} color={filter === "completed" ? "success" : "primary"}
                        variant={filter === "completed" ? "outlined" : "text"}>completed
                </Button>
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
    changeTaskTitle: (todolistID: string, id: string, newTitle: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}



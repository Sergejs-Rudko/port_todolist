import React, {ChangeEvent, useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import styles from "./Todolist.module.css"
import {FilterTypes} from "./state/todolistsReducer";
import {TaskStatuses, TaskType} from "./API/todolistsAPI";
import {useDispatch} from "react-redux";
import {fetchTasksTC} from "./state/taskReducer";


export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch()
    const {filter} = props

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])

    let tasksForTodolist = props.tasks
    if (filter === "active") {
        tasksForTodolist = props.tasks.filter((task) => task.status === TaskStatuses.New)
    }

    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter((task) => task.status === TaskStatuses.Completed)
    }


    const onAllFilter = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props])

    const onActiveFilter = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props])

    const onCompletedFilter = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props])

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props])


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
                    tasksForTodolist.map((t) => <Task key={t.id}
                                                      task={t}
                                                      todolistId={props.id}
                                                      removeTask={props.removeTask}
                                                      changeTaskStatus={props.changeTaskStatus}
                                                      changeTaskTitle={props.changeTaskTitle}
                        />
                    )
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
})

type TaskPropsType = {
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    task: TaskType
}

const Task = React.memo((props: TaskPropsType) => {

    const onRemoveHandler = useCallback(() => {
        props.removeTask(props.task.id, props.todolistId)
    }, [props])

    const onCheckboxChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        props.changeTaskStatus(props.task.id, status, props.todolistId)
    }, [props])

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title)
    }, [props])

    return <li className={styles.task} key={props.task.id}><Checkbox
        checked={props.task.status === TaskStatuses.Completed}
        onChange={onCheckboxChangeHandler}/>

        <EditableSpan title={props.task.title} changeItemTitle={(title) => changeTaskTitle(title)}/>
        <IconButton onClick={onRemoveHandler}>
            <DeleteIcon color={"secondary"}/>
        </IconButton>
    </li>
})

type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    removeTask: (id: string, todolistID: string) => void
    changeFilter: (filter: FilterTypes, todolistID: string) => void
    addTask: (title: string, todolistID: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistID: string) => void
    filter: FilterTypes
    removeTodolist: (id: string) => void
    changeTaskTitle: (todolistID: string, id: string, newTitle: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}



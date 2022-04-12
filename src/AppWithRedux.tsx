import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Toolbar, IconButton, Typography, Container, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = (id: string, todolistID: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }

    const changeFilter = (filter: FilterTypes, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatch(addTaskAC(todolistID, title))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatch(changeTaskStatusAC(todolistID, id, isDone))
    }

    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))

    }

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }

    const changeTaskTitle = (todolistID: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, newTitle))
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        TODOLISTS
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container>
                    <AddItemForm addItem={(title) => {
                        addTodolist(title)
                    }} addLabel={"Add Todolist"}/>
                </Grid>
                <Grid container spacing={5}>
                    {
                        todolists.map((tl) => {
                            let tasksForTodolist = tasks[tl.id]
                            if (tl.filter === "active") {
                                tasksForTodolist = tasks[tl.id].filter((task) => !task.isDone)
                            }

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter((task) => task.isDone)
                            }


                            return <Grid item>
                                <Paper elevation={3} variant="outlined" style={{padding: "20px", marginTop: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeTaskStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        filter={tl.filter}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterTypes
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterTypes = "all" | "active" | "completed"

export default AppWithRedux;


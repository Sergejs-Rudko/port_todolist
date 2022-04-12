import React, {useReducer, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Toolbar, IconButton, Typography, Container, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "./state/taskReducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolistsReducer";

function AppWithReducers() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [tasks, dispatchToTasks] = useReducer(taskReducer,
        {
            [todolistId1]: [
                {id: v1(), title: "HTML", isDone: true},
                {id: v1(), title: "CSS", isDone: true},
                {id: v1(), title: "React", isDone: false},
            ],
            [todolistId2]: [
                {id: v1(), title: "Banna", isDone: false},
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Snickers", isDone: false},
            ],
        }
    )

    let [todolists, dispatchToTodolist] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])


    const removeTask = (id: string, todolistID: string) => {
        dispatchToTasks(removeTaskAC(todolistID, id))
    }

    const changeFilter = (filter: FilterTypes, todolistID: string) => {
        dispatchToTodolist(changeTodolistFilterAC(todolistID,filter))
    }

    const addTask = (title: string, todolistID: string) => {
        dispatchToTasks(addTaskAC(todolistID,title))
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        dispatchToTasks(changeTaskStatusAC(todolistID,id,isDone))
    }

    const removeTodolist = (id: string) => {
        dispatchToTodolist(removeTodolistAC(id))
        dispatchToTasks(removeTodolistAC(id))
    }

    const addTodolist = (title: string) => {
        let action = addTodolistAC(title)
        dispatchToTodolist(action)
        dispatchToTasks(action)
    }

    const changeTaskTitle = (todolistID: string, id: string, newTitle: string) => {
        dispatchToTasks(changeTaskTitleAC(todolistID,id,newTitle))
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        dispatchToTodolist(changeTodolistTitleAC(id,newTitle))
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
                                tasksForTodolist = tasks[tl.id].filter((task) => task.isDone === false)
                            }

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter((task) => task.isDone === true)
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

export default AppWithReducers;


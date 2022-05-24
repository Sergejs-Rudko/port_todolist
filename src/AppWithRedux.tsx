import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Toolbar, IconButton, Typography, Container, Grid, Paper} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/taskReducer";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, fetchTodolistsTC,
    removeTodolistAC,  TodolistDomainType
} from "./state/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TaskStatuses, TaskType, todolistsAPI} from "./API/todolistsAPI";


function AppWithRedux() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())

    }, [])

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = useCallback((id: string, todolistID: string) => {
        dispatch(removeTaskAC(todolistID, id))
    }, [dispatch])

    const changeFilter = useCallback((filter: FilterTypes, todolistID: string) => {
        dispatch(changeTodolistFilterAC(todolistID, filter))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistID: string) => {
        dispatch(addTaskAC(todolistID, title))
    }, [dispatch])

    const changeTaskStatus = useCallback((id: string, status: TaskStatuses, todolistID: string) => {
        dispatch(changeTaskStatusAC(todolistID, id, status))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodolistAC(title)
        dispatch(action)
    }, [dispatch])

    const changeTaskTitle = useCallback((todolistID: string, id: string, newTitle: string) => {
        dispatch(changeTaskTitleAC(todolistID, id, newTitle))
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        dispatch(changeTodolistTitleAC(id, newTitle))
    }, [dispatch])

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

                            return <Grid item key={tl.id}>
                                <Paper elevation={3} style={{padding: "20px", marginTop: "10px"}}>
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


/*export type TodolistType = {
    id: string
    title: string
    filter: FilterTypes
}*/

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type FilterTypes = "all" | "active" | "completed"

export default AppWithRedux;


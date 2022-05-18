import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {FilterTypes} from "./state/todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "./API/todolistsAPI";

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>(
        {
            [todolistId1]: [
                {
                    description: "",
                    title: "HTML",
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: "",
                    deadline: "",
                    id: v1(),
                    todoListId: todolistId1,
                    order: 0,
                    addedDate: ""
                },
                {
                    description: "",
                    title: "CSS",
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Low,
                    startDate: "",
                    deadline: "",
                    id: v1(),
                    todoListId: todolistId1,
                    order: 0,
                    addedDate: ""
                },
            ],
            [todolistId2]: [
                {
                    description: "",
                    title: "REACT",
                    status: TaskStatuses.Completed,
                    priority: TaskPriorities.Low,
                    startDate: "",
                    deadline: "",
                    id: v1(),
                    todoListId: todolistId1,
                    order: 0,
                    addedDate: ""
                }
            ]
        }
    )

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},
    ])


    const removeTask = (id: string, todolistID: string) => {
        let t = tasks[todolistID]
        let filteredTasks = t.filter((task) => task.id !== id)
        tasks[todolistID] = filteredTasks
        setTasks({...tasks})
    }

    const changeFilter = (filter: FilterTypes, todolistID: string) => {
        let todolist = todolists.find((tl) => tl.id === todolistID)
        if (todolist) {
            todolist.filter = filter
            setTodolists([...todolists])
        }
    }

    const addTask = (title: string, todolistID: string) => {
        let newTask: TaskType = {
            description: "",
            title,
            status: TaskStatuses.Completed,
            priority: TaskPriorities.Low,
            startDate: "",
            deadline: "",
            id: v1(),
            todoListId: todolistID,
            order: 0,
            addedDate: ""
        }
        let t = tasks[todolistID]
        let newTasks = [newTask, ...t]
        tasks[todolistID] = newTasks
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistID: string) => {
        let t = tasks[todolistID]
        let task = t.find((task) => task.id === id)
        if (task) {
            task.status = status
        }

        setTasks({...tasks})
    }

    const removeTodolist = (id: string) => {
        let tls = todolists.filter((tl) => tl.id !== id)
        delete tasks[id]
        setTodolists(tls)
        setTasks({...tasks})
    }

    const addTodolist = (title: string) => {
        let todolist: TodolistType = {id: v1(), title, filter: "all"}
        setTodolists([todolist, ...todolists])
        setTasks({...tasks, [todolist.id]: []})
    }

    const changeTaskTitle = (todolistID: string, id: string, newTitle: string) => {
        let t = tasks[todolistID].find((task) => task.id === id)
        if (t) {
            t.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        let tl = todolists.find((tl) => tl.id === id)
        if (tl) {
            tl.title = newTitle
            setTodolists([...todolists])
        }
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
                                tasksForTodolist = tasks[tl.id].filter((task) => task.status === TaskStatuses.New)
                            }

                            if (tl.filter === "completed") {
                                tasksForTodolist = tasks[tl.id].filter((task) => task.status === TaskStatuses.Completed)
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


export type TodolistType = {
    id: string
    title: string
    filter: FilterTypes
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


export default App;


// 8: 40
import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

function App() {

    let todolistId1 = v1()
    let todolistId2 = v1()

    let [tasks, setTasks] = useState<TasksStateType>(
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
        let newTask: TaskType = {id: v1(), title, isDone: false}
        let t = tasks[todolistID]
        let newTasks = [newTask, ...t]
        tasks[todolistID] = newTasks
        setTasks({...tasks})
    }

    const changeTaskStatus = (id: string, isDone: boolean, todolistID: string) => {
        let t = tasks[todolistID]
        let task = t.find((task) => task.id === id)
        if (task) {
            task.isDone = isDone
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

    const changeTaskTitle = (todolistID : string, id : string, newTitle : string) => {
        let t = tasks[todolistID].find((task) => task.id === id)
        if(t){
            t.title = newTitle
            setTasks({...tasks})
        }
    }

    const changeTodolistTitle = (id : string, newTitle : string) => {
        let tl = todolists.find((tl) => tl.id === id)
        if(tl){
            tl.title = newTitle
            setTodolists([...todolists])
        }
    }

    return (
        <div className="App">
            <AddItemForm addItem={(title) => {
                addTodolist(title)
            }}/>
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodolist = tasks[tl.id].filter((task) => task.isDone === false)
                    }

                    if (tl.filter === "completed") {
                        tasksForTodolist = tasks[tl.id].filter((task) => task.isDone === true)
                    }


                    return <Todolist
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
                })
            }

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

export default App;



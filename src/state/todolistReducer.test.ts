import {v1} from "uuid";
import {TodolistType} from "../App";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./todolistsReducer";

export let a = 1

test("correct todolist should be removed", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    let action = removeTodolistAC(todolistID1)
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(1)
})

test("adding correct todolist", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    let action = addTodolistAC("new todolist")
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("new todolist")
})

test("change todolist title should be correct", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    let action = changeTodolistTitleAC(todolistID1,"title have been changed")
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe("title have been changed")
    expect(endState[1].title).toBe("What to buy")

})


test("change todolist filter for correct todolist", () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    const startState: Array<TodolistType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"},
    ]

    let action = changeTodolistFilterAC(todolistID1,"completed")
    const endState = todolistsReducer(startState, action)

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("completed")
    expect(endState[1].filter).toBe("all")

})
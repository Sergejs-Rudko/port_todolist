import {FilterTypes, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.id)
        }
        case "ADD_TODOLIST": {
            let todolist: TodolistType = {id: v1(), title: action.title, filter: "all"}
            return [...state, todolist]
        }
        case "CHANGE_TODOLIST_TITLE": {
            let todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                return state.map((tl) => tl.id !== action.id ? tl : {...tl, title: action.newTitle})
            }else{
                throw new Error("INVALID ID FOR CHANGING TODOLIST TITLE")
            }
        }
        case "CHANGE_TODOLIST_FILTER":{
            let todolist = state.find((tl) => tl.id === action.id)
            if(todolist){
                return state.map((tl)=> tl.id === action.id ? {...tl, filter : action.filter} : tl)
            }else{
                throw new Error("INVALID ID TO CHANGE TODOLIST FILTER")
            }
        }
    }
    return state
}

export const removeTodolistAC = (id: string) => ({
    type: "REMOVE_TODOLIST",
    id
} as const)

export const addTodolistAC = (title: string) => ({
    type: "ADD_TODOLIST",
    title
} as const)

export const changeTodolistTitleAC = (id: string, newTitle: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    id,
    newTitle
} as const)

export const changeTodolistFilterAC = (id : string, filter : FilterTypes) => ({
    type : "CHANGE_TODOLIST_FILTER",
    id,
    filter
}as const)

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
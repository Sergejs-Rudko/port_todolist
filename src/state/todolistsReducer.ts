import {v1} from "uuid";
import {TodolistType} from "../API/todolistsAPI";

export let todolistId1 = v1()
export let todolistId2 = v1()

const initialState = [
    /*    {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"},*/
] as Array<TodolistDomainType>

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case "REMOVE_TODOLIST": {
            return state.filter((tl) => tl.id !== action.id)
        }
        case "ADD_TODOLIST": {
            let todolist: TodolistDomainType = {id: action.id, title: action.title, filter: "all" , addedDate : "", order : 0}
            return [todolist, ...state]
        }
        case "CHANGE_TODOLIST_TITLE": {
            let todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                return state.map((tl) => tl.id !== action.id ? tl : {...tl, title: action.newTitle})
            } else {
                throw new Error("INVALID ID FOR CHANGING TODOLIST TITLE")
            }
        }
        case "CHANGE_TODOLIST_FILTER": {
            let todolist = state.find((tl) => tl.id === action.id)
            if (todolist) {
                return state.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
            } else {
                throw new Error("INVALID ID TO CHANGE TODOLIST FILTER")
            }
        }
        case "SET_TODOLISTS": {
            return {...action.todolists}
        }
        default :
            return state
    }
}

export const removeTodolistAC = (id: string) => ({
    type: "REMOVE_TODOLIST",
    id
} as const)

export const addTodolistAC = (title: string) => ({
    type: "ADD_TODOLIST",
    title,
    id: v1()
} as const)

export const changeTodolistTitleAC = (id: string, newTitle: string) => ({
    type: "CHANGE_TODOLIST_TITLE",
    id,
    newTitle
} as const)

export const changeTodolistFilterAC = (id: string, filter: FilterTypes) => ({
    type: "CHANGE_TODOLIST_FILTER",
    id,
    filter
} as const)

export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: "SET_TODOLISTS",
    todolists
} as const)
//TYPES____________________________________________________________________________________________________________
export type FilterTypes = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
    filter : FilterTypes
}

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType |
    SetTodolistsActionType

type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

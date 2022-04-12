import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolistsReducer";

const initialState: TasksStateType = {
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

export const taskReducer = (state: TasksStateType = initialState, action: TaskReducerActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE_TASK": {
            let todolist = state[action.todolistID]
            if (todolist) {
                return {...state, [action.todolistID]: state[action.todolistID].filter((t) => t.id !== action.id)}
            } else {
                throw new Error("INVALID TODOLIST ID")
            }
        }
        case "ADD_TASK": {
            let task: TaskType = {
                id: v1(),
                isDone: false,
                title: action.title
            }
            let todolist = state[action.todolistId]
            if (todolist) {
                return {
                    ...state,
                    [action.todolistId]: [task, ...state[action.todolistId]]
                }
            } else {
                throw new Error("INVALID TODOLIST ID")
            }
        }
        case "CHANGE_TASK_TITLE": {
            let todolist = state[action.todolistID]
            if (todolist) {
                return {
                    ...state,
                    [action.todolistID]: state[action.todolistID].map((t) => t.id !== action.id ? t : {
                        ...t,
                        title: action.newTitle
                    })
                }
            } else {
                throw new Error("INVALID TODOLIST ID")
            }
        }
        case "CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map((t) => t.id !== action.id ? t : {
                    ...t,
                    isDone: action.isDone
                })
            }
        }
        case "ADD_TODOLIST": {
            return {...state, [action.id]: []}
        }
        case "REMOVE_TODOLIST": {
            let copy = {...state}
            delete copy[action.id]
            return copy
        }
        default :
            return state
    }
}


export const removeTaskAC = (todolistID: string, id: string) => ({
    type: "REMOVE_TASK",
    todolistID,
    id
} as const)

export const addTaskAC = (todolistId: string, title: string) => ({
    type: "ADD_TASK",
    todolistId,
    title
} as const)

export const changeTaskTitleAC = (todolistID: string, id: string, newTitle: string) => ({
    type: "CHANGE_TASK_TITLE",
    todolistID,
    id,
    newTitle
} as const)

export const changeTaskStatusAC = (todolistID: string, id: string, isDone: boolean) => ({
    type: "CHANGE_TASK_STATUS",
    todolistID,
    id,
    isDone
} as const)

type TaskReducerActionType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskTitleActionType
    | ChangeTaskStatusActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
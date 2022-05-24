import axios from "axios";


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "a22bfbba-37b1-4c5b-a966-b83499c73071"
    }
})

export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists")
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title})
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.put<ResponseType>(`todo-lists${id}`, {title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(` /todo-lists/${todolistId}/tasks/${taskId}`, {model})
    }

}

// ENUM ________________________________________________________________________________________________________________
export enum TaskStatuses {
    New = 0,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    High,
    Urgent,
    Later
}

//TYPES_________________________________________________________________________________________________________________

export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
} // from server


type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type TaskType = {
    description: string
    title: string
    //isDone: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
} // From server

type GetTasksResponseType = {
    items: TaskType []
    totalCount: number
    error: string | null
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}




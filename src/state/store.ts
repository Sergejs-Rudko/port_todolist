import {combineReducers, createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistsReducer} from "./todolistsReducer";

export const rootReducer = combineReducers({
    todolists : todolistsReducer,
    tasks : taskReducer
})
export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store
import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./taskReducer";
import {todolistsReducer} from "./todolistsReducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    todolists : todolistsReducer,
    tasks : taskReducer
})
export const store = createStore(rootReducer,applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store
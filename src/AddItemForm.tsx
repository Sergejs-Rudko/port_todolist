import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
}


export const AddItemForm = (props: AddItemFormPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState("")
    let [error, setError] = useState(false)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setNewTaskTitle(e.currentTarget.value)
    }

    const addTask = () => {
        if (newTaskTitle.trim().length === 0) {
            setNewTaskTitle("")
            setError(true)
            return
        }
        props.addItem(newTaskTitle)
        setNewTaskTitle("")
    }

    const onAddTaskViaEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            addTask()
        }
    }

    return (
        <div>
            <input type="text"
                   value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyPress={onAddTaskViaEnterHandler}
                   className={error ? "error" : ""}/>
            <button onClick={() =>
                addTask()
            }>Add task
            </button>
            {error && <div className={"errorMessage"}>Title is required</div>}
        </div>
    )
}
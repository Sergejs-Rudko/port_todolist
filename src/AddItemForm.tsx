import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void
    addLabel: string
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
            <TextField
                variant={"standard"}
                label={props.addLabel}
                type="text"
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyPress={onAddTaskViaEnterHandler}
                error={error}
            ></TextField>
            <IconButton onClick={addTask}>
                <AddCircleOutlineIcon color={"primary"}/>
            </IconButton>
            {error && <div className={"errorMessage"}>Title is required</div>}
        </div>
    )
}
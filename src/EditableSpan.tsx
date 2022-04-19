import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@mui/material";

export const EditableSpan = React.memo((props: PropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const editModeON = useCallback(() => {
        setEditMode(true)
        setTitle(props.title)
    }, [props])

    const editModeOFF = useCallback(() => {
        props.changeItemTitle(title)
        setEditMode(false)
    }, [props, title])

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])


    return (

        editMode
            ? <TextField value={title}
                         variant={"standard"}
                         autoFocus={true}
                         onBlur={editModeOFF}
                         onChange={onChange}
            />
            : <span onDoubleClick={editModeON}>{props.title}</span>
    )
})

type PropsType = {
    title: string
    changeItemTitle: (title: string) => void
}
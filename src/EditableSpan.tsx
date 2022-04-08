import React, {ChangeEvent, useState} from "react";

export const EditableSpan = (props: PropsType) => {

    let [editMode, setEditMode] = useState(false)
    let [title, setTitle] = useState("")

    const editModeON = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const editModeOFF = () => {
        props.changeItemTitle(title)
        setEditMode(false)
    }
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (

        editMode
            ? <input value={title}
                     autoFocus={true}
                     onBlur={editModeOFF}
                     onChange={onChange}
            />
            : <span onDoubleClick={editModeON}>{props.title}</span>
    )
}

type PropsType = {
    title: string
    changeItemTitle: (title: string) => void
}
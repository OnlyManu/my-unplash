import React, { ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux"
import utils from "../../styles/utils.module.css"

import { FormAdd } from "./formAdd";
import { addPicture } from "../../lib/database"

interface IProps {
    onClose: () => void,
}


export default function FormAddPicture({onClose}: IProps) {
    const [formAdd, setFormAdd] = useState<ReactPortal | null>(null)
    
    useEffect(() => {
        setFormAdd(
            createPortal(
                <FormAdd onClose={onClose} />
                ,
                document.body
            )
        )
    }, [])
    return (
        <>
            {formAdd}
        </>
    )
}

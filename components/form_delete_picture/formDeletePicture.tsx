import React, { ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import FormDelete from "./formDelete"


interface IProps {
    onClose: () => void,
    pictureId: string
}

export default function FormDeletePicture({onClose, pictureId}: IProps) {
    const [formDelete, setFormDelete] = useState<ReactPortal | null>(null)
    
    useEffect(() => {
        setFormDelete(
            createPortal(
                <FormDelete onClose={onClose} pictureId={pictureId} />                
                ,
                document.body
            )
        )
    }, [])
    return (
        <>
            {formDelete}
        </>
    )
}
import { useState } from "react"
import utils from "../../styles/utils.module.css"

import FormDeletePicture from "../form_delete_picture/formDeletePicture"

interface IProps {
    pictureId: string
}

export default function ButtonDelete({pictureId}: IProps) {
    const [isFormDeleteOpen, setIsFormDeleteOpen] = useState<boolean>(false)

    const openFormDelete = () => {
        const body = document.querySelector("body")
        body?.classList.add("formOpen")

        setIsFormDeleteOpen(true)
    }

    const closeFormDelete = () => {
        const body = document.querySelector("body")
        body?.classList.remove("formOpen")

        setIsFormDeleteOpen(false)
    }

    return (
        <div style={{"alignSelf": "flex-end"}}>
            <button className={utils.btnWithBorderRed} onClick={openFormDelete}>Delete</button>
            { isFormDeleteOpen && <FormDeletePicture onClose={closeFormDelete} pictureId={pictureId} /> }
        </div>
    )
}
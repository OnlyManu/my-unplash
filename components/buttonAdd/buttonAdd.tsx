import { useState } from "react"
import utils from "../../styles/utils.module.css"

import FormAddPicture from "../form_add_picture/formAddPicture"

export default function ButtonAdd() {
    const [isFormAddOpen, setIsFormAddOpen] = useState<boolean>(false)

    const openFormAdd = () => {
        const body = document.querySelector("body")
        body?.classList.add("formOpen")

        setIsFormAddOpen(true)
    }

    const closeFormAdd = () => {
        const body = document.querySelector("body")
        body?.classList.remove("formOpen")

        setIsFormAddOpen(false)
    }

    return (
        <div>
            <button className={utils.btn + " " + utils.btnWithBackground + " " + utils.btnGreen} onClick={openFormAdd}>
                Add a photo
            </button>
            { isFormAddOpen && <FormAddPicture onClose={closeFormAdd} />}
        </div>
    )
}
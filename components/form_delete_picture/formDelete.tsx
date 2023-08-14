import React, { useState } from "react"
import { useDispatch } from "react-redux"
import utils from "../../styles/utils.module.css"

import { deletePictureAction } from "../../lib/store"
import { deletePicture, verifyIfAdmin } from "../../lib/database"

interface IProps {
    onClose: () => void,
    pictureId: string
}

export default function FormDelete({ onClose, pictureId }: IProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [password, setPassword] = useState<string>("")
    const dispatch = useDispatch()

    const handleChangePassword = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value
        setPassword(value)
    }

    const handlePictureDelete = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!isLoading) {
            setIsLoading(true)
            const isAdmin = await verifyIfAdmin(password)
            
            if (isAdmin) {
                const result = await deletePicture(pictureId)
                if (result) {
                    dispatch(deletePictureAction(pictureId))
                } else {
                    alert("Something went wrong!")
                }
                setIsLoading(false)
                onClose()
            } else {
                alert("Your password must be incorect.")
                setIsLoading(false)
            }
        }
    }


    return (
        <div className={utils.formWrapper}>
            <form className={utils.form}>
                <h2 className={utils.formTitle}>Are you sure ?</h2>
                <div className={utils.formIptGroup}>
                    <label className={utils.formLabel}>Password</label>
                    <input className={utils.ipt+" "+utils.formIpt} type="password" value={password} onChange={handleChangePassword} />
                </div>
                <div className={utils.formButtons}>
                    <button className={utils.btn+" "+utils.formButton+" "+utils.btnWithoutBackground} onClick={onClose}>Cancel</button>
                    <button className={utils.btn + " " + utils.formButton + " " + utils.btnWithBackground + " " + utils.btnRed} type="submit" onClick={handlePictureDelete}>
                        {
                            isLoading
                                ? <span className={utils.spinnerSM}></span>
                                : <span>Delete</span>
                        }
                    </button>
                </div>
            </form>
        </div>
        
    )
}
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import utils from "../../styles/utils.module.css"

import { IPicture } from "../../lib/types"
import { addPictureAction } from "../../lib/store"
import { addPicture, app } from "../../lib/database"

interface IProps {
    onClose: () => void,
}

export function FormAdd({ onClose }: IProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [pictureName, setPictureName] = useState<string>("")
    const [pictureUrl, setPictureUrl] = useState<string>("")
    const dispatch = useDispatch()

    const handleChangePictureName = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value
        setPictureName(value)
    }

    const handleChangePictureUrl = (e: React.FormEvent<HTMLInputElement>) => {
        const value: string = e.currentTarget.value
        setPictureUrl(value)
    }

    const handlePictureAdd = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (!isLoading) {
            setIsLoading(true)
            if (formVerification()) {
                const result: IPicture = await addPicture(pictureName, pictureUrl)
                
                if (result.id !== "error") {
                    dispatch(addPictureAction(result))
                } else {
                    alert("Something went wrong!")
                }
                setIsLoading(false)
                onClose()
            } else {
                alert("please complete the form correctly!")
                setIsLoading(false)
            }
        }   
    }
    
    const formVerification = (): boolean => {
        const reg = /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/
        if (pictureName != "" && reg.test(pictureUrl)) {
            return true
        }
        return false
    }

    return (
        <div className={utils.formWrapper}>
            <form className={utils.form}>
                <h2 className={utils.formTitle}>Add a new photo</h2>
                <div className={utils.formIptGroup}>
                    <label className={utils.formLabel}>Label</label>
                    <input className={utils.ipt+" "+utils.formIpt} type="text" value={pictureName} onChange={handleChangePictureName} />
                </div>
                <div className={utils.formIptGroup}>
                    <label className={utils.formLabel}>Photo Url</label>
                    <input className={utils.ipt+" "+utils.formIpt} style={{"textOverflow": "ellipsis"}} type="text" value={pictureUrl} onChange={handleChangePictureUrl} />
                </div>
                <div className={utils.formButtons}>
                    <button className={utils.btn+" "+utils.formButton+" "+utils.btnWithoutBackground} onClick={onClose}>Cancel</button>
                    <button className={utils.btn + " " + utils.formButton + " " + utils.btnWithBackground + " " + utils.btnGreen} type="submit" onClick={handlePictureAdd}>
                        {
                            isLoading
                                ? <span className={utils.spinnerSM}></span>
                                : <span>Submit</span>
                        }
                        
                    </button>
                </div>
            </form>
        </div>
        
    )
}
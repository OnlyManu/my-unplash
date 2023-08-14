import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { IPicture, IStatePictures } from "../../lib/types"
import styles from "./listPictures.module.css"

import CardPicture from "../card_picture/cardPicture"
import Loader from "../loader/loader"
import { getPictures } from "../../lib/database"
import { initialisePicturesListAction, picturesLoadingAction } from "../../lib/store"


export default function ListPictures() {
    const picturesList = useSelector((state: IStatePictures) => state.pictures)
    const arePicturesLoading = useSelector((state: IStatePictures) => state.arePicturesLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        getPictures().then((result) => {
            dispatch(initialisePicturesListAction(result))
            dispatch(picturesLoadingAction(false))
        })
    }, [])

    if (arePicturesLoading) {
        return <Loader />
    }

    return (
        <div className={styles.container}>
            {picturesList.map((picture: IPicture, index: number) => <CardPicture key={index} {...picture} />)}
        </div>
    )
}
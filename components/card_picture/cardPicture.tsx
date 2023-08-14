import { IPicture } from "../../lib/types"
import styles from "./cardPicture.module.css"
import utils from "../../styles/utils.module.css"

import ButtonDelete from "../buttonDelete/buttonDelete"

export default function CardPicture({id, name, src}:IPicture) {
    return (
        <div className={styles.container}>
            <img className={styles.picture} src={src} alt={name} />
            <div className={styles.hoverLayout}>
                <ButtonDelete pictureId={id} />
                <div className={styles.label}>{name}</div>
            </div>
        </div>
    )
}
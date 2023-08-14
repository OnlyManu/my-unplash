import styles from "./loader.module.css"
import utils from "../../styles/utils.module.css"

export default function Loader() {
    return (
        <div className={styles.container}>
            <span className={utils.spinnerLG}></span>
        </div>
    )
}
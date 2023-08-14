import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from "./searchbar.module.css"
import utils from "../../styles/utils.module.css"

import { getPituresByName } from '../../lib/database'
import { initialisePicturesListAction, picturesLoadingAction } from '../../lib/store'

export default function Searchbar() {
    
    const [search, setSearch] = useState<string>("")
    const dispatch = useDispatch()

    const searchPictures = async (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(picturesLoadingAction(true))
        const value: string = e.currentTarget.value
        setSearch(value)
        const pictures = await getPituresByName(value)
        dispatch(initialisePicturesListAction(pictures))
        dispatch(picturesLoadingAction(false))
    }

    return (
        <div className={styles.container}>
            <Image
                src={"./my_unsplash_logo.svg"}
                width={138}
                height={26}
                alt=""
                priority={true}
            />
            <form method='POST'>
                <div className={styles.iptGroup}>
                    <input type={"text"} className={styles.ipt+" "+utils.ipt} placeholder="Search by name" value={search} onChange={searchPictures} />
                    <div className={styles.iptIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} width="24" height="24" viewBox="0 0 24 24">
                            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                        </svg>
                    </div>
                </div>
                
            </form>
        </div>
        
    )
}
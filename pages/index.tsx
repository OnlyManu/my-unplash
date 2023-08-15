import Head from 'next/head'
import styles from '../styles/Home.module.css'

import Searchbar from '../components/searchbar/searchbar'
import ButtonAdd from '../components/buttonAdd/buttonAdd'
import ListPictures from '../components/list_pictures/listPictures'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>My Unplash</title>
        <meta name="description" content="A simple copy of unplash" />
        <link rel="icon" href="/devchallenges.png" />
      </Head>

      <header className={styles.header}>
        <Searchbar />
        <ButtonAdd />
      </header>

      <main className={styles.main}>
        <ListPictures />
      </main>
    </div>
  )
}

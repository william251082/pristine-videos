import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/core/Banner";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>GuitaraHub</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>GuitaraHub</h1>
      <Banner />
    </div>
  )
}

export default Home

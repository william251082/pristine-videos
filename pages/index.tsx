import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/core/Banner";
import Navbar from "../components/core/Nav";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>GuitaraHub</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Navbar username="hi@hi.com"/>
            <Banner title="Clifford"
                    subTitle="Cute dog"
                    imgUrl="/static/clifford.webp"
            />
        </div>
    )
}

export default Home

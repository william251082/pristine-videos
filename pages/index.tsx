import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Banner from "../components/core/Banner";
import Navbar from "../components/core/Nav";
import Card from "../components/core/Card";
import {bannerData, cardData, headData, navData} from "../data/components";

const Home: NextPage = () => {
    return (
        <div className={styles.container}>
            <Head>
                <title>{headData.title}</title>
                <link rel={headData.rel} href={headData.href}/>
            </Head>
            <Navbar username={navData.username}/>
            <Banner title={bannerData.title}
                    subTitle={bannerData.subTitle}
                    imgUrl={bannerData.imgUrl}
            />
            <Card
                id={cardData.id}
                imgUrl={cardData.imgUrl}
                size={cardData.size}
                shouldScale={cardData.shouldScale}
            />
            <Card
                id={cardData.id}
                imgUrl={cardData.imgUrl}
                size={cardData.size}
                shouldScale={cardData.shouldScale}
            />
            <Card
                id={cardData.id}
                imgUrl={cardData.imgUrl}
                size={cardData.size}
                shouldScale={cardData.shouldScale}
            />
        </div>
    )
}

export default Home

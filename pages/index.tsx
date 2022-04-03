import type {NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {bannerData, cardData, headData, navData, sectionCardData} from "@data/index";
import Navbar from "@components/core/Nav";
import {Banner, Card} from "@components/core";
import SectionCards from "@components/core/SectionCard";

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
            <SectionCards
                title={sectionCardData.title}
                videos={sectionCardData.videos}
                size={sectionCardData.size}
                shouldWrap={sectionCardData.shouldWrap}
                shouldScale={sectionCardData.shouldScale}
            />
        </div>
    )
}

export default Home

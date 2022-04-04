import type {InferGetServerSidePropsType, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {bannerData, headData, navData, sectionCardData} from "@data/index";
import Navbar from "@components/core/Nav";
import {Banner} from "@components/core";
import SectionCards from "@components/core/SectionCard";
import {getVideos} from "@lib/videos";

export interface DisneyVideo {
    id: string
    title: string
    imgUrl: string
}

export async function getServerSideProps() {
    const disneyVideos: DisneyVideo[] = getVideos();
    return { props: {disneyVideos} }
}

const Home = ({disneyVideos}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
            <div className={styles.sectionWrapper}>
                <SectionCards
                    title={sectionCardData.title}
                    videos={disneyVideos}
                    size={sectionCardData.size}
                    shouldWrap={sectionCardData.shouldWrap}
                    shouldScale={sectionCardData.shouldScale}
                />
                <SectionCards
                    title={sectionCardData.title}
                    videos={sectionCardData.videos}
                    size={'medium'}
                    shouldWrap={sectionCardData.shouldWrap}
                    shouldScale={sectionCardData.shouldScale}
                />
            </div>
        </div>
    )
}

export default Home

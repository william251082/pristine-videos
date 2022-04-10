import type {InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import styles from '@styles/Home.module.css'
import {bannerData, headData, sectionCardData} from "@data/index";
import Navbar from "@components/core/Nav";
import {Banner} from "@components/core";
import SectionCards from "@components/core/SectionCard";
import {getPopularVideos, getVideos} from "@lib/videos";
import {queryHasuraGql} from "@lib/db/hasura";

export async function getServerSideProps() {
    const disneyVideos = await getVideos('disney trailer');
    const travelVideos = await getVideos('travel');
    const productivityVideos = await getVideos('productivity');
    const popularVideos = await getPopularVideos();
    return { props: {disneyVideos, travelVideos, productivityVideos, popularVideos} }
}

const Home = (
    {disneyVideos, travelVideos, productivityVideos, popularVideos}: InferGetServerSidePropsType<typeof getServerSideProps>
) => {
    queryHasuraGql().then(r => r)
    return (
        <div className={styles.container}>
            <Head>
                <title>{headData.title}</title>
                <link rel={headData.rel} href={headData.href}/>
            </Head>
            <div className={styles.main}>
                <Navbar />
                <Banner
                    videoId = {bannerData.videoId}
                    title={bannerData.title}
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
                        title={'Travel'}
                        videos={travelVideos}
                        size={'small'}
                        shouldWrap={sectionCardData.shouldWrap}
                        shouldScale={sectionCardData.shouldScale}
                    />
                    <SectionCards
                        title={'Productivity'}
                        videos={productivityVideos}
                        size={'medium'}
                        shouldWrap={sectionCardData.shouldWrap}
                        shouldScale={sectionCardData.shouldScale}
                    />
                    <SectionCards
                        title={'Popular'}
                        videos={popularVideos}
                        size={'small'}
                        shouldWrap={sectionCardData.shouldWrap}
                        shouldScale={sectionCardData.shouldScale}
                    />
                </div>
            </div>
        </div>
    )
}

export default Home

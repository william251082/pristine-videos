import type {InferGetServerSidePropsType} from 'next'
import Head from 'next/head'
import styles from '@styles/Home.module.css'
import {bannerData, headData, sectionCardData} from "@data/index";
import Navbar from "@components/core/Nav";
import {Banner} from "@components/core";
import SectionCards from "@components/core/SectionCard";
import {getPopularVideos, getVideos, getWatchItAgainVideos} from "@lib/videos";

export async function getServerSideProps() {
    const userId = 'william'
    const token = 'WyIweGFjMmRhMjBjYTAzMWI3MWZjNjEyNTJiNjQ0YjA0NjdjOTU0MTRmODc2YzQ1OGRmYzMxNDgxZDhjMzgwZWVhNGI0MTUzN2RjZmQ5MjQ4MjUyNzBiZDg5YTAxNGZiY2EwNzY4YWJmZjg0M2UzMDBkZDJjYTg4NWZjOWQyNjRmMDFkMWIiLCJ7XCJpYXRcIjoxNjUwODA1MjEwLFwiZXh0XCI6MTY1MDgwNjExMCxcImlzc1wiOlwiZGlkOmV0aHI6MHgwZGVDMDI1NjkyZjRjZjExN0VBZjhjNzZjRDRGMzVCNzlkZmUwQUNFXCIsXCJzdWJcIjpcInk4RW5oa29ITWREcVpmNzVSUGlxX0lTeThlYjhKYkpBYngxTG5BamgwUWc9XCIsXCJhdWRcIjpcIlV1UHl6TVVzMnNIZVJDRUJIaXQ5dU44Z1ZqWFBHM0txV1FUYkZISFJfTkU9XCIsXCJuYmZcIjoxNjUwODA1MjEwLFwidGlkXCI6XCIwMjI0OWQxNi05NjFiLTQwYWItODFkNS02ODg1ZWM5MWExNzRcIixcImFkZFwiOlwiMHgxNTU4Mjg3YTE4NTNlZDA4YjRmZjlkMDM5NjgwZGU2N2JhYWFjNmQ5ZTllMmYyOTRmZGE2ZmFiZmJmNDQ4YTdjNmQ2ZWRiZDFhMzVjMmVkODQxNzY0MDdiMDc0ZmFmODY5NDA0MGY2YjYzZWIwNGNjYThkM2FmNjg2MmMxNDNlMjFiXCJ9Il0='
    const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
    const disneyVideos = await getVideos('disney trailer');
    const travelVideos = await getVideos('travel');
    const productivityVideos = await getVideos('productivity');
    const popularVideos = await getPopularVideos();
    return {props: {
        disneyVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos
    }}
}

const Home = ({
    disneyVideos, travelVideos, productivityVideos, popularVideos, watchItAgainVideos
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
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
                        title={'Watch It Again'}
                        videos={watchItAgainVideos}
                        size={sectionCardData.size}
                        shouldWrap={sectionCardData.shouldWrap}
                        shouldScale={sectionCardData.shouldScale}
                    />
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

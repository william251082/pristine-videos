import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import Head from "next/head";
import styles from "@styles/MyList.module.css";
import Navbar from "@components/core/Nav";
import redirectUser from "@utils/redirectUser";
import SectionCards from "@components/core/SectionCard";
import {sectionCardData} from "@data/index";
import {getWatchItAgainVideos} from "@lib/videos";

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {userId, token} = await redirectUser(context)
    if (!userId) {
        return {
            props: {},
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }
    const watchItAgainVideos = await getWatchItAgainVideos(userId, token)
    return {props: {watchItAgainVideos}}
}

const MyList = ({
    watchItAgainVideos
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <div>
            <Head>
                <title>My list</title>
            </Head>
            <main className={styles.main}>
                <Navbar/>
                <div className={styles.sectionWrapper}>
                    <SectionCards
                        title={'My List'}
                        videos={[]}
                        size={'small'}
                        shouldWrap={sectionCardData.shouldWrap}
                        shouldScale={sectionCardData.shouldScale}
                    />
                </div>
            </main>
        </div>
    );
};

export default MyList;

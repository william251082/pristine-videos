import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next"
import Head from "next/head"
import styles from "@styles/MyList.module.css"
import {Navbar} from "@components/core"
import redirectUser from "@utils/redirectUser"
import {getMyList} from "@lib/videos"
import {SectionCards} from "@components/core"

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const {userId, token} = await redirectUser(context)
    const myListVideos = await getMyList(userId, token);
    return {props: {myListVideos}}
}

const MyList = ({
    myListVideos
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
                        videos={myListVideos}
                        size={'small'}
                        shouldWrap={true}
                        shouldScale={false}
                    />
                </div>
            </main>
        </div>
    );
};

export default MyList

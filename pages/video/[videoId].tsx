import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "@styles/Video.module.css"
import cn from "classnames"
import {InferGetStaticPropsType} from "next";
import {getYoutubeVideoById} from "@lib/videos";

Modal.setAppElement("#__next")

interface VideoProps {
    title: string
    publishTime: string
    description: string
    channelTitle: string
    viewCount: number
}

export async function getStaticProps() {
    // const video: VideoProps = {
    //     title: 'Cute dog',
    //     publishTime: '1990-01-01',
    //     description: 'A big red dog',
    //     channelTitle: 'Paramount',
    //     viewCount: 1000
    // }
    const videoId = 'mYfJxlgR2jw'
    const videoArray = await getYoutubeVideoById(videoId)

    return {
        props: { video: videoArray.length > 0 ? videoArray[0] : {}, },
        revalidate: 10
    };
}

export async function getStaticPaths() {
    const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"]
    const paths = listOfVideos.map((videoId) => ({
        params: { videoId }
    }))

    return { paths, fallback: "blocking" }
}

const Video = ({video}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const router = useRouter()
    const {title, publishTime, description, channelTitle, viewCount} = video
    return (
        <div className={styles.container}>
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                overlayClassName={styles.overlay}
            >
                <iframe id="player"
                        className={styles.videoPlayer}
                        width="100%"
                        height="390"
                        src={`https://www.youtube.com/embed/mYfJxlgR2jw?enablejsapi=1&origin=https://example.com&controls=0`}
                        frameBorder="0"
                />
                <div className={styles.modalBody}>
                    <div className={styles.modalBodyContent}>
                        <div className={styles.col1}>
                            <p className={styles.publishTime}>{publishTime}</p>
                            <p className={styles.title}>{title}</p>
                            <p className={styles.description}>{description}</p>
                        </div>
                        <div className={styles.col2}>
                            <p className={cn(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>Cast: </span>
                                <span className={styles.channelTitle}>{channelTitle}</span>
                            </p>
                            <p className={cn(styles.subText, styles.subTextWrapper)}>
                                <span className={styles.textColor}>View Count: </span>
                                <span className={styles.channelTitle}>{viewCount}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Video

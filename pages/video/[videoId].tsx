import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "@styles/Video.module.css"
import cn from "classnames"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getYoutubeVideoById} from "@lib/videos";
import Navbar from "@components/core/Nav";
import DisLike from "@components/icons/dislike-icon";
import Like from "@components/icons/like-icon";
import React, {useState} from "react";

Modal.setAppElement("#__next")

export async function getStaticProps({params}: GetStaticPropsContext) {
    let videoArray = []
    if (params) {
        const videoId = typeof params.videoId === 'string' ? params.videoId : ''
        videoArray = await getYoutubeVideoById(videoId)
    }

    return {
        props: { video: videoArray.length > 0 ? videoArray[0] : {} },
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
    const {id, title, publishTime, description, channelTitle, viewCount} = video
    const [toggleLike, setToggleLike] = useState(false);
    const [toggleDisLike, setToggleDisLike] = useState(false);
    const handleToggleDislike = () => {
        setToggleDisLike(!toggleDisLike)
        setToggleLike(toggleDisLike)
    };

    const handleToggleLike = () => {
        const val = !toggleLike
        setToggleLike(val)
        setToggleDisLike(toggleLike)
    };
    return (
        <div className={styles.container}>
            <Navbar />
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                overlayClassName={styles.overlay}
                className={styles.modal}
            >
                <iframe id="player"
                        className={styles.videoPlayer}
                        width="100%"
                        height="390"
                        src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=https://example.com&controls=0`}
                        frameBorder="0"
                />
                <div className={styles.likeDislikeBtnWrapper}>
                    <div className={styles.btnWrapper}>
                        <button onClick={handleToggleLike}><Like selected={toggleLike} /></button>
                    </div>
                    <div className={styles.btnWrapper}>
                        <button onClick={handleToggleDislike}><DisLike selected={toggleDisLike} /></button>
                    </div>
                </div>
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

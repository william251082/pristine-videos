import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "@styles/Video.module.css"
import cn from "classnames"
import {GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {getYoutubeVideoById} from "@lib/videos";
import Navbar from "@components/core/Nav";
import DisLike from "@components/icons/dislike-icon";
import Like from "@components/icons/like-icon";
import React, {useCallback, useEffect, useState} from "react";

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
    const videoId = router.query.videoId
    const {title, publishTime, description, channelTitle, viewCount} = video
    const [toggleLike, setToggleLike] = useState(true);
    const [toggleDisLike, setToggleDisLike] = useState(false);
    const handleToggleDislike = async () => {
        const val = toggleDisLike
        setToggleDisLike(!toggleDisLike)
        setToggleLike(toggleDisLike)
        await toggleCall(val)
    };

    const handleToggleLike = async () => {
        const val = !toggleLike
        setToggleLike(val)
        setToggleDisLike(toggleLike)
        await toggleCall(val)
    };
    const fetchFavourite = useCallback(async () => {
        const response = await fetch(`/api/stats?videoId=${videoId}`, {method: 'GET'})
        const data = await response.json()
        if (data.length > 0) {
            const favourited = data[0].favourited
            if (favourited === 1) {
                setToggleLike(true)
                setToggleDisLike(false)
            } else if (favourited === 0) {
                setToggleLike(false)
                setToggleDisLike(true)
            }
        }
    }, [videoId])

    useEffect(() => {
        fetchFavourite().catch(console.error)
    }, [fetchFavourite])

    const toggleCall = async (val: boolean) => {
        const response = await fetch('/api/stats', {
            method: 'POST',
            body: JSON.stringify({
                favourited: val ? 1 : 0, videoId
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        await response.json()
    }
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
                        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=https://example.com&controls=0`}
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

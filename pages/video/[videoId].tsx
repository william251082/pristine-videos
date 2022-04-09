import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "@styles/Video.module.css";
import cn from "classnames";

Modal.setAppElement("#__next");

const Video = () => {
    const router = useRouter()
    const id = router.query.videoId
    const video = {
        id,
        title: 'Cute dog',
        publishTime: '1990-0101',
        description: 'A big red dog',
        channelTitle: 'Paramount',
        viewCount: 1000
    }
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
                        src={`https://www.youtube.com/embed/${id}?enablejsapi=1&origin=https://example.com&controls=0`}
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

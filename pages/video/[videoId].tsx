import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "@styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
    const router = useRouter()
    const videoId = router.query.videoId
    return (
        <div className={styles.container}>
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                overlayClassName={styles.overlay}
            >
                <iframe id="player"
                        width="640"
                        height="390"
                        src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=https://example.com&controls=0`}
                        frameBorder="0"
                />
            </Modal>
        </div>
    )
}

export default Video

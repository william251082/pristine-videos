import {useRouter} from "next/router"
import Modal from "react-modal"
import styles from "@styles/Video.module.css";

const Video = () => {
    const router = useRouter()
    const videoId = router.query.videoId
    return (
        <div>
            video page {videoId}
            <Modal
                isOpen={true}
                contentLabel="Watch the video"
                onRequestClose={() => router.back()}
                overlayClassName={styles.overlay}
            >
                <div>Modal Body</div>
            </Modal>
        </div>
    )
}

export default Video

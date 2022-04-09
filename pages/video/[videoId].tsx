import {useRouter} from "next/router";

const Video = () => {
    const router = useRouter();
    const videoId = router.query.videoId;
    return <div>vid</div>
}

export default Video

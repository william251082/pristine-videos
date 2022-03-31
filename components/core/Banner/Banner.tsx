import {FC} from "react";
import styles from "./Banner.module.css";

export interface BannerProps {
    title: string
    subTitle: string
    imgUrl: string
}

const Banner: FC<BannerProps> = ({ title, subTitle, imgUrl}) => {
    const handleOnPlay = () => {
        console.log('handleOnPlay')
    }
    return (
        <div className={styles.container}>
            <div className={styles.leftWrapper}>
                <div className={styles.left}>
                    <div className={styles.seriesWrapper}>
                        <p className={styles.firstLetter}>N</p>
                        <p className={styles.series}>S E R I E S</p>
                    </div>
                    <h3 className={styles.title}>{title}</h3>
                    <h3 className={styles.subTitle}>{subTitle}</h3>
                    <div className={styles.playButtonWrapper}>
                        <button className={styles.btnWithIcon} onClick={handleOnPlay}>
                            <span className={styles.playText}>Play</span>
                        </button>
                    </div>
                </div>
            </div>
            <div
                className={styles.bannerImg}
                style={{
                    backgroundImage: `url(${imgUrl})`,
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    backgroundSize: 'cover',
                    backgroundPosition: "50% 50%",
                }}
            />
        </div>
    )
}

export default Banner

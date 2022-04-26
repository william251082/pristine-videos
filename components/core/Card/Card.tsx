import {FC, useState} from "react";
import styles from "./Card.module.css";
import {CardProps, ClassMapImgSizes} from "./CardTypes";
import Image from "next/image";
import {motion} from "framer-motion";
import cn from "classnames";

const Card: FC<CardProps> = ({id, imgUrl, size, defaultImg, shouldScale}) => {
    const [imgSrc, setImgSrc] = useState(imgUrl)
    const classMap: ClassMapImgSizes = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    }
    const scale = id === 0 ? {scaleY: 1.1} : {scale: 1.1}
    const shouldHover = shouldScale && {whileHover: {...scale}}
    const handleOnError = () => {
        setImgSrc(defaultImg)
    }
    return (
        <div className={styles.container}>
            <motion.div
                {...shouldHover}
                className={cn(styles.imgMotionWrapper, classMap[size])}
            >
                <Image
                    className={styles.cardImg}
                    src={imgSrc}
                    alt="image"
                    layout="fill"
                    onError={handleOnError}
                    priority={true}
                />
            </motion.div>
        </div>
    )
}

export default Card

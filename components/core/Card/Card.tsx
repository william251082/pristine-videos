import {FC, useState} from "react";
import styles from "./Card.module.css";
import {CardProps, ClassMapImgSizes} from "./CardTypes";
import Image from "next/image";

const Card: FC<CardProps> = ({imgUrl, size}) => {
    const [imgSrc, setImgSrc] = useState(imgUrl);
    const classMap: ClassMapImgSizes = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    };
    const handleOnError = () => {
        setImgSrc("/static/clifford.webp")
    }
    return (
        <div className={styles.container}>
            Card
            <div className={classMap[size]}>
                <Image
                    className={styles.cardImg}
                    src={imgSrc}
                    alt="image"
                    layout="fill"
                    width="300px"
                    height="300px"
                    onError={handleOnError}
                />
            </div>
        </div>
    )
}

export default Card

import {FC} from "react";
import styles from "./Card.module.css";
import {CardProps, ClassMapImgSizes} from "./CardTypes";
import Image from "next/image";

const Card: FC<CardProps> = ({imgUrl, size, id, shouldScale}) => {
    const classMap: ClassMapImgSizes = {
        large: styles.lgItem,
        medium: styles.mdItem,
        small: styles.smItem
    };
    return (
        <div className={styles.container}>
            Card
            <div className={classMap[size]}>
                <Image
                    className={styles.cardImg}
                    src={imgUrl}
                    alt="image"
                    layout="fill"
                    width="300px"
                    height="300px"
                />
            </div>
        </div>
    )
}

export default Card

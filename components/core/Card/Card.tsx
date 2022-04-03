import {FC} from "react";
import styles from "./Card.module.css";
import {CardProps} from "./CardTypes";
import Image from "next/image";

const Card: FC<CardProps> = ({imgUrl, size, id, shouldScale}) => {
    return (
        <div className={styles.container}>
            <Image
                src={imgUrl}
                alt="image"
                width="300px"
                height="300px"
            />
        </div>
    )
}

export default Card

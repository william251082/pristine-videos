import styles from "./SectionCards.module.css";
import {FC} from "react";
import {SectionCardProps} from "./SectionCardTypes";
import cn from "classnames";
import {Card} from "@components/core";
import {cardData} from "@data/index";

const SectionCards: FC<SectionCardProps> = ({title, videos, size, shouldScale}) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cn(styles.cardWrapper)}>
          {videos.map((video, idx) => {
              return (
                <Card
                    key={idx}
                    id={idx}
                    imgUrl={video.imgUrl}
                    size={size}
                    shouldScale={shouldScale}
                    defaultImg={cardData.defaultImg}
                />
              );
          })}
      </div>
    </section>
  );
};

export default SectionCards;

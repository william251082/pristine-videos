import {FC} from "react";

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
        <div>
            <h3>{title}</h3>
            <h3>{subTitle}</h3>
            <button onClick={handleOnPlay}>Play</button>
            <div style={{
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

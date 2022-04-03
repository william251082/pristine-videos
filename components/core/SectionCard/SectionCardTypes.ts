export interface Videos {
    imgUrl: string
}
export interface SectionCardProps {
    title: string,
    videos: Videos[],
    size: string,
    shouldWrap: boolean,
    shouldScale: boolean
}

import {DisneyVideo} from "../pages";

export interface VideoItem {
    kind: string
    etag: string
    id: {
        kind: string
        videoId: string
    },
    snippet: {
        publishedAt: string
        channelId: string
        title: string
        description: string
        thumbnails: {
            default: {
                url: string
                width: number
                height: number
            },
            medium: {
                url: string
                width: number
                height: number
            },
            high: {
                url: string
                width: number
                height: number
            }
        },
        channelTitle: string
        liveBroadcastContent: string
        publishTime: string
    }
}

export const getVideos = async (): Promise<DisneyVideo[]> => {
    const YOUTUBE_API_KEY: string | undefined = process.env.YOUTUBE_API_KEY
    const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=disney%20trailer&key=${YOUTUBE_API_KEY}`
    )
    const data = await response.json()

    return data.items.map((item: VideoItem) => {
        return {
            id: item.id.videoId,
            title: item.snippet.title,
            imgUrl: item.snippet.thumbnails.high.url
        }
    })
}

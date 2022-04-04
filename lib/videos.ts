import {DisneyVideo} from "../pages";
import {string} from "prop-types";

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

export const getVideos = async (searchQuery: string) => {
    const YOUTUBE_API_KEY: string | undefined = process.env.YOUTUBE_API_KEY
    try {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchQuery}&key=${YOUTUBE_API_KEY}`
        )
        const data = await response.json()

        if (data.error) {
            console.error('Youtube API error.', data.error)
            return []
        }

        return data.items.map((item: VideoItem) => {
            const id = item.id.videoId || item.id
            return {
                id,
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.high.url
            }
        })
    } catch (error) {
        console.error('Something went wrong with the video library', error)
    }
}

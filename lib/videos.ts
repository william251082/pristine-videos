export interface VideoItem {
    statistics: number;
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

const getCommonVideos = async (url: string) => {
    const YOUTUBE_API_KEY: string | undefined = process.env.YOUTUBE_API_KEY
    try {
        const BASE_URL = 'youtube.googleapis.com/youtube/v3'
        const response = await fetch(
            `https://${BASE_URL}/${url}&maxResults=5&key=${YOUTUBE_API_KEY}`
        )
        const data = await response.json()

        if (data.error) {
            console.error('Youtube API error.', data.error)
            return []
        }

        return data.items.map((item: VideoItem) => {
            const id = item.id.videoId || item.id
            const snippet = item.snippet
            return {
                id,
                title: snippet.title,
                description: snippet.description,
                publishTime: snippet.publishedAt,
                channelTitle: snippet.channelTitle,
                statistics: item.statistics ? item.statistics : { viewCount: 0 },
                imgUrl: snippet.thumbnails.high.url
            }
        })
    } catch (error) {
        console.error('Something went wrong with the video library', error)
    }
}

export const getVideos = (searchQuery: string) => {
    const URL = `search?part=snippet&q=${searchQuery}&type=video`
    return getCommonVideos(URL)
}

export const getPopularVideos = () => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`
    return getCommonVideos(URL)
}

export const getYoutubeVideoById = (videoId: string) => {
    const URL = `videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}`;
    return getCommonVideos(URL);
}

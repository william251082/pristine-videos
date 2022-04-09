import {Magic} from "magic-sdk"

const key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY
const apiKey = key === undefined ? '' : key
export const createMagic = () => typeof window !== "undefined" && new Magic(apiKey)


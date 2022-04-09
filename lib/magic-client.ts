import {Magic} from "magic-sdk"

const apiKey = process.env.MAGIC_PUBLISHABLE_API_KEY === undefined ? '' : process.env.MAGIC_PUBLISHABLE_API_KEY
export const createMagic = () => typeof window !== "undefined" && new Magic(apiKey)


import {Magic} from "magic-sdk"

const key = process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY
const apiKey = key === undefined ? '' : key
const createMagic = () => typeof window !== "undefined" && new Magic(apiKey)
export const magic = createMagic()


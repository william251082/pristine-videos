import '@styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import {magic} from "@lib/magic-client";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        handleIsLoggedIn().then(r => r)
        const handleComplete = () => setIsLoading(false)

        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        };
    }, [])

    const handleIsLoggedIn = async () => {
        if (magic) {
            const isLoggedIn = await magic.user.isLoggedIn()
            if (isLoggedIn) {
                router.push('/').then(r => r)
            } else {
                router.push('/login').then(r => r)
            }
        }
    }

    return isLoading ? <div>Loading...</div> : <Component {...pageProps} />
}

export default MyApp

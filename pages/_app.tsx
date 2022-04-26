import '@styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import {magic} from "@lib/magic-client";
import {useRouter} from "next/router";
import Loading from "@components/ui/Loading";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleIsLoggedIn = async () => {
        if (magic) {
            const isLoggedIn = await magic.user.isLoggedIn()
            if (isLoggedIn) {
                router.push('/').catch(console.error)
            } else {
                router.push('/login').catch(console.error)
            }
        }
    }

    useEffect(() => {
        handleIsLoggedIn().catch(console.error)
        const handleComplete = () => setIsLoading(false)

        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        };
    }, [handleIsLoggedIn, router])



    return isLoading ? <Loading /> : <Component {...pageProps} />
}

export default MyApp

import '@styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import Loading from "@components/ui/Loading";
import Head from 'next/head'

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleComplete = () => setIsLoading(false)

        router.events.on("routeChangeComplete", handleComplete)
        router.events.on("routeChangeError", handleComplete)

        return () => {
            router.events.off("routeChangeComplete", handleComplete)
            router.events.off("routeChangeError", handleComplete)
        };
    }, [router])



    return (
        <>
            <Head>
                <title>Pristine Videos</title>
            </Head>
            {isLoading ? <Loading /> : <Component {...pageProps} />}
        </>
    )
}

export default MyApp

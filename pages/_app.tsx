import '@styles/globals.css'
import type {AppProps} from 'next/app'
import {useEffect} from "react";
import {magic} from "@lib/magic-client";
import {useRouter} from "next/router";

function MyApp({Component, pageProps}: AppProps) {
    const router = useRouter()

    useEffect(() => {
        handleIsLoggedIn().then(r => r)
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

    return <Component {...pageProps} />
}

export default MyApp

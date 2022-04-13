import React, {FC, useEffect, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "./Login.module.css";
import {useRouter} from "next/router";
import {magic} from "@lib/magic-client";

const Login: FC = () => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [userMsg, setUserMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleComplete = () => {
            setIsLoading(false)
        }
        router.events.on('routeChangeComplete', handleComplete)

        return () => {
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [router])

    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMsg('')
        const email = e.target.value
        setEmail(email)
    }
    const handleLoginWithEmail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (email) {
            try {
                setIsLoading(true)
                if (magic) {
                    const didToken = await magic.auth.loginWithMagicLink({email})
                    if (didToken) {
                        const response = await fetch("/api/login", {
                            method: "POST",
                            headers: {
                                "Authorization": `Bearer ${didToken}`,
                                "Content-Type": "application/json"
                            }
                        })
                        const loggedInResponse = await response.json()
                        if (loggedInResponse.done) {
                            await router.push("/")
                        } else {
                            setIsLoading(false)
                            setUserMsg("Something went wrong logging in")
                        }
                    }
                }
            } catch (error) {
                console.error("Something went wrong logging in", error)
                setIsLoading(false)
            }
        } else {
            setIsLoading(false)
            setUserMsg("Enter a valid email address")
        }
    }
    return (
        <div className={styles.container}>
            <Head>
              <title>Pristine Videos SignIn</title>
            </Head>
            <header className={styles.header}>
                <div className={styles.headerWrapper}>
                    <Link href="/">
                        <a className={styles.logoLink}>
                            <div className={styles.logoWrapper}>
                                <Image
                                    src="/static/netflix.svg"
                                    alt="Netflix logo"
                                    width="128px"
                                    height="34px"
                                />
                            </div>
                        </a>
                    </Link>
                </div>
            </header>
            <main className={styles.main}>
                <div className={styles.mainWrapper}>
                    <h1 className={styles.signInHeader}>Sign In</h1>
                    <input
                        type="text"
                        placeholder="Email address"
                        className={styles.emailInput}
                        onChange={handleOnChangeEmail}
                    />
                    <p className={styles.userMsg}>{userMsg}</p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
                        {isLoading ? "Loading..." : "Sign In"}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login

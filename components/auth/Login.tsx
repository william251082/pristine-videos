import React, {FC, useState} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "./Login.module.css";

const Login: FC = () => {
    const [email, setEmail] = useState('')
    const [userMsg, setUserMsg] = useState('')
    const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserMsg('')
        const email = e.target.value
        setEmail(email)
    }
    const handleLoginWithEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        console.log(e)
        if (email) {
            // route to dashboard
        } else {
            // show user message
            setUserMsg('Enter a valid email.')
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
                        {userMsg ? "Loading..." : "Sign In"}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login

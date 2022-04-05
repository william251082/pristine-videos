import {FC} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "./Login.module.css";

const Login: FC = () => {
    const handleLoginWithEmail = () => {
        console.log('hi')
    }
    const handleOnChangeEmail = () => {
        console.log('hi')
    }
    return (
        <div>
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
                    <p className={styles.userMsg}>userMsg</p>
                    <button onClick={handleLoginWithEmail} className={styles.loginBtn}>

                    </button>
                </div>
            </main>
        </div>
    )
}

export default Login

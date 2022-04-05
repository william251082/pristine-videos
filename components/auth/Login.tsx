import {FC} from "react";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import styles from "./Login.module.css";

const Login: FC = () => {
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
        </div>
    )
}

export default Login

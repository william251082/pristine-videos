import {FC, MouseEventHandler} from 'react'
import styles from "./Navbar.module.css";
import {useRouter} from "next/router";
import Link from 'next/link';

interface NavbarProps {
    username: string
}

const Navbar: FC<NavbarProps> = ({username}) => {
    const router = useRouter()
    const handleOnClickHome = (e: Event) => {
        e.preventDefault()
        router.push('/').then(r => r)
    }
    const handleOnClickMyList = (e: Event) => {
        e.preventDefault()
        router.push('/browse/my-list').then(r => r)
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        Netflix
                    </div>
                </a>
                <ul className={styles.navItems}>
                    <li
                        className={styles.navItem}
                        onClick={() => handleOnClickHome}
                    >
                        Home
                    </li>
                    <li
                        className={styles.navItem2}
                        onClick={() => handleOnClickMyList}
                    >
                        My List
                    </li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn}>
                            <p className={styles.username}>{username}</p>
                        </button>
                        <div className={styles.navDropdown}>
                            <div>
                                <Link href="/login">
                                    <a className={styles.linkName}>Sign out</a>
                                </Link>
                                <div className={styles.lineWrapper}>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar

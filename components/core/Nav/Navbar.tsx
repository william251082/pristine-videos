import React, {FC, useState} from 'react'
import styles from "./Navbar.module.css";
import {useRouter} from "next/router";
import Link from 'next/link';
import Image from "next/image";
import {NavbarProps} from "./NavbarTypes";

const Navbar: FC<NavbarProps> = ({username}) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const router = useRouter()

    const handleOnClickHome = (e: React.MouseEvent<HTMLLIElement>): void => {
        e.preventDefault()
        router.push('/').then(r => r)
    }
    const handleOnClickMyList = (e: React.MouseEvent<HTMLLIElement>): void => {
        e.preventDefault()
        router.push('/browse/my-list').then(r => r)
    }
    const handleShowDropdown = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault()
        setShowDropdown(!showDropdown)
    }
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
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
                <ul className={styles.navItems}>
                    <li
                        className={styles.navItem}
                        onClick={handleOnClickHome}
                    >
                        Home
                    </li>
                    <li
                        className={styles.navItem2}
                        onClick={handleOnClickMyList}
                    >
                        My List
                    </li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn} onClick={handleShowDropdown}>
                            <p className={styles.username}>{username}</p>
                            <Image
                                src={"/static/expand_more.svg"}
                                alt="Expand dropdown"
                                width="24px"
                                height="24px"
                            />
                        </button>
                        {showDropdown && (
                            <div className={styles.navDropdown}>
                                <div>
                                    <Link href="/login">
                                        <a className={styles.linkName}>Sign out</a>
                                    </Link>
                                    <div className={styles.lineWrapper}>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Navbar

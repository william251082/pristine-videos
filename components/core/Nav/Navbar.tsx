import React, {FC, useEffect, useState} from 'react'
import styles from "./Navbar.module.css";
import {useRouter} from "next/router";
import Link from 'next/link';
import Image from "next/image";
import {magic} from "@lib/magic-client";
import {NavbarProps} from "@components/core/Nav/NavbarTypes";

const Navbar: FC<NavbarProps> = () => {
    const router = useRouter()
    const [showDropdown, setShowDropdown] = useState(false)
    const [username, setUsername] = useState<string | null>('')

    useEffect(() => {
        handleEmail().then(r => r)
    }, [])

    const handleEmail = async () => {
        try {
            if (magic) {
                const {email} = await magic.user.getMetadata()
                const didToken = await magic.user.getIdToken()
                if (email) {
                    setUsername(email)
                }
            }
        } catch (err) {
            console.error('Error retrieving email.', err)
        }
    }

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
    const handleSignOut = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        try {
            if (magic) {
                await magic.user.logout()
                router.push('/login').then(r => r)
            }
        } catch(err) {
            console.error('Error retrieving email.', err)
            router.push('/login').then(r => r)
        }
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
                                        <a className={styles.linkName} onClick={handleSignOut}>Sign out</a>
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

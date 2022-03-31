import {FC} from 'react'
import styles from "./Navbar.module.css";

interface NavbarProps {
    username: string
}

const Navbar: FC<NavbarProps> = ({username}) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <a className={styles.logoLink} href="/">
                    <div className={styles.logoWrapper}>
                        Netflix
                    </div>
                </a>
                <ul className={styles.navItems}>
                    <li className={styles.navItem}>Home</li>
                    <li className={styles.navItem2}>My List</li>
                </ul>
                <nav className={styles.navContainer}>
                    <div>
                        <button className={styles.usernameBtn}>
                            <p className={styles.username}>{username}</p>
                        </button>
                        <div className={styles.navDropdown}>
                            <div>
                                <a className={styles.linkName}>Sign out</a>
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

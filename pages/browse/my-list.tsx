import {GetServerSidePropsContext} from "next";
import Head from "next/head";
import styles from "@styles/MyList.module.css";
import Navbar from "@components/core/Nav";

export async function getServerSideProps({params}: GetServerSidePropsContext) {

    return {
        props: {},
    };
}

const MyList = () => {
    return (
        <div>
            <Head>
                <title>My list</title>
            </Head>
            <main className={styles.main}>
                <Navbar/>
                <div className={styles.sectionWrapper}>

                </div>
            </main>
        </div>
    );
};

export default MyList;

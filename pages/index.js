import Head from 'next/head'
import Layout from '../components/Layout';
import {getSortedPostsData} from '../lib/posts'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Date from '../components/date'

export default function Home({allPostsData}) {
    return (
        <Layout home>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h2 className={utilStyles.headingLg}>Words. Hopes. Recordings.</h2>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, date, title, description, image}) => (
                        <li key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <div className={utilStyles.listItem}>
                                    <img src={image} alt={title} className={utilStyles.postImage}/>
                                    <div className={utilStyles.content}>
                                        <a>{title}</a>
                                        <p>{description}</p>
                                        <br/>
                                        <small className={utilStyles.lightText}>
                                            <Date dateString={date}/>
                                        </small>


                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )
}

export async function getStaticProps() {
    const allPostsData = getSortedPostsData()
    return {
        props: {
            allPostsData
        }
    }
}
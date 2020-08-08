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
                <title>Thoughts of Arnav Puri</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>


            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <ul className={utilStyles.list}>
                    {allPostsData.map(({id, frontMatter, content}) => (
                        <li key={id}>
                            <Link href="/posts/[id]" as={`/posts/${id}`}>
                                <div className={utilStyles.listItem}>
                                    <img src={frontMatter.imageSm} alt={frontMatter.title}
                                         className={utilStyles.postImage}/>
                                    <div className={utilStyles.content}>
                                        <h1 className={'post-title'}>{frontMatter.title}</h1>
                                        <p>{frontMatter.description}</p>
                                        <small className={utilStyles.lightText}>
                                            <Date dateString={frontMatter.date}/>
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
    const allPostsData = getSortedPostsData();
    return {
        props: {
            allPostsData
        }
    }
}
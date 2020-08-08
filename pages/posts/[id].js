import Layout from '../../components/Layout';
import Head from 'next/head'
import {getAllPostIds, getPostData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import Date from "../../components/date";
import React from "react";
import ReactMarkdown from 'react-markdown'

export default function Post({postData}) {
    let info = postData.frontMatter;
    return (
        <Layout>
            <Head>
                <title>{info.title}</title>
            </Head>
            <article>
                <h1 className={`${utilStyles.headingXl} ${utilStyles.center}`}>{info.title}</h1>
                <img src={info.image} alt="" className={utilStyles.postHeroImage}/>
                <div className={utilStyles.lightText} style={{marginTop: '12px'}}>
                    <Date dateString={info.date}/>
                </div>
                <ReactMarkdown source={postData.mdContent} escapeHtml={false}/>
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id);
    return {
        props: {
            postData
        }
    }
}
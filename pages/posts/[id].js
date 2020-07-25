import Layout from '../../components/Layout';
import Head from 'next/head'
import {getAllPostIds, getPostData} from '../../lib/posts';
import utilStyles from '../../styles/utils.module.css'
import Date from "../../components/date";
import React from "react";

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={`${utilStyles.headingXl} ${utilStyles.center}`}>{postData.title}</h1>
                <img src={postData.image} alt="" className={utilStyles.postHeroImage}/>
                <div className={utilStyles.lightText} style={{marginTop: '12px'}}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} style={{marginTop: '20px'}}/>
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
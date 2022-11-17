import Seo from '../../components/Seo'
import Header from "../../components/Header";
import { GraphQLClient } from 'graphql-request';
import { useTranslations } from "next-intl";
import React from 'react';
import Hero from '../../components/Hero';
import { GET_BLOGS_BY_LANG } from "../../config/queries";
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

const alternates = [
    {
        hrefLang: "en",
        href: `${process.env.NEXT_PUBLIC_URL}/blogs`
    },
    {
        hrefLang: "nl",
        href: `${process.env.NEXT_PUBLIC_URL}/nl/blogs`
    },
];

const Blogs = ({ blogs, t }) => {
    if (blogs.length) {
        return (
            <section className="cards">
                {
                    blogs.map((blog, index) => {
                        return (
                            blog.content && (
                                <Card key={index} item={blog} prefixLink={'/blogs/'} />
                            )
                        )
                    })
                }
            </section>
        )
    }

    return <p>{t('noBlogs')}</p>
}

const Index = ({ data }) => {
    const { blogs } = data;
    const t = useTranslations('blogs');

    return (
        <>
            <Seo title={t('title')} description={t('description')}
                alternates={alternates} />
            <Header />
            <Layout>
                <Hero title={t('title')} titleTwo={t('title_two')} />
                <main className='mb-lg'>
                    <section>
                        <p className='text content'>
                            {t('description')}
                        </p>
                    </section>
                    <Blogs blogs={blogs} t={t} />
                </main>
            </Layout>
            <Footer />
        </>
    )
}

export default Index;

export async function getStaticProps({ locale }) {
    const client = new GraphQLClient(process.env.API_URL);

    return {
        props: {
            data: await client.request(GET_BLOGS_BY_LANG, { locale: [locale] }),
            messages: (await import(`../../lang/${locale}.json`)).default,
        }
    };
}
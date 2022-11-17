import Seo from '../../components/Seo'
import Header from "../../components/Header";
import { GraphQLClient } from 'graphql-request';
import { useTranslations } from "next-intl";
import React from 'react';
import Hero from '../../components/Hero';
import { GET_PROJECTS_BY_LANG } from "../../config/queries";
import Card from '../../components/Card';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

const alternates = [
    {
        hrefLang: "en",
        href: `${process.env.NEXT_PUBLIC_URL}/projects`
    },
    {
        hrefLang: "nl",
        href: `${process.env.NEXT_PUBLIC_URL}/nl/projects`
    },
];

const Projects = ({ projects, p }) => {
    if (projects.length) {
        return (
            <section className="cards">
                {
                    projects.map((project, index) => {
                        return (
                            <Card key={index} item={project}
                                prefixLink={'/projects/'}
                                showSummary={true} />
                        )
                    })
                }
            </section>
        )
    }

    return <p>{p('noProjects')}</p>
}

const Index = ({ data }) => {
    const { projects } = data;
    const p = useTranslations('projects');

    return (
        <>
            <Seo title={p('title')} description={p('description')}
                alternates={alternates} />
            <Header />
            <Layout>
                <Hero title={p('title')} titleTwo={p('title_two')} />
                <main className='mb-lg'>
                    <section>
                        <p className='text content'>
                            {p('description')}
                        </p>
                    </section>
                    <Projects projects={projects} p={p} />
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
            data: await client.request(GET_PROJECTS_BY_LANG, { locale: [locale] }),
            messages: (await import(`../../lang/${locale}.json`)).default,
        }
    };
}
import Seo from '../../components/Seo'
import Header from "../../components/Header";
import { GraphQLClient } from 'graphql-request';
import { useTranslations } from "next-intl";
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { GET_PROJECT_SLUGS, GET_PROJECT_BY_SLUG } from "../../config/queries";
import { useRouter } from 'next/router';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

const Project = ({ data, links }) => {
    const router = useRouter();

    const { projects } = links;
    const project = data.projects[0];
    const { query, locale: routerLocale } = router;
    const { title, summary, tags, image, content, date, link } = project;
    const { img, alt } = image;
    
    let projectOtherLang;

    projects.forEach((_project) => {
        const { localizations } = _project;

        const foundProject = localizations.find((localization) => {
            const { id, locale } = localization;
            return id === project.id && locale !== routerLocale;
        });

        if (foundProject) projectOtherLang = foundProject;
    });

    const { locale: otherLangLocale, slug: otherLangSlug } = projectOtherLang;

    const alternates = [
        {
            hrefLang: routerLocale,
            href: routerLocale === 'en' ?
                `${process.env.NEXT_PUBLIC_URL}/projects/${query.slug}` :
                `${process.env.NEXT_PUBLIC_URL}/${routerLocale}/projects/${query.slug}`
        },
        {
            hrefLang: otherLangLocale,
            href: otherLangLocale === 'en' ?
                `${process.env.NEXT_PUBLIC_URL}/projects/${otherLangSlug}` :
                `${process.env.NEXT_PUBLIC_URL}/${otherLangLocale}/projects/${otherLangSlug}`
        },
    ]

    const p = useTranslations('project');

    return (
        <div className='blog'>
            <Seo title={title} description={summary} alternates={alternates} />
            <Header otherLang={projectOtherLang} />
            <Layout>
                <main>
                    <article>
                        <div className='blog_heading'>
                            <h1 className="grand_title theme_color title_underline">{title}</h1>
                            <p className='mb-2'>{summary}</p>
                        </div>
                        <div className='image_container'>
                            <Image src={img.url} alt={alt}
                                layout="fill" objectFit='cover'
                                className='radius-md' priority />
                        </div>
                        <div className='blog_content'>
                            <div className='blog_info'>
                                <div className="tags">
                                    {
                                        tags.map((tag, index) => {
                                            return <span className='tag' key={index}>{tag.name}</span>
                                        })
                                    }
                                </div>
                                <small className='info_right text_with_icon'>
                                    <FontAwesomeIcon icon="fa-solid fa-calendar-day" />
                                    <span>{date}</span>
                                </small>
                            </div>
                            <div className='blog_text'>
                                <div className='text' dangerouslySetInnerHTML={{ __html: content.html }} />
                                <div className='blog_text_row'>
                                    <div>
                                        <Link href={'/projects'}>
                                            <a className='button button_primary button_with_icon'>
                                                <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" role={"button"} />
                                                <span className='font_bold'>{p('back')}</span>
                                            </a>
                                        </Link>
                                    </div>
                                    {
                                        link && (
                                            <div>
                                                <a href={link} rel="noreferrer" target='_blank'
                                                    className='button button_primary button_with_icon'>
                                                    <span className='font_bold'>{p('link')}</span>
                                                    <FontAwesomeIcon icon={faArrowRightLong} role={"button"} />
                                                </a>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </article>
                </main>
            </Layout>
            <Footer />
        </div>
    )
}

export default Project;

export async function getStaticPaths() {
    const client = new GraphQLClient(process.env.API_URL);
    const data = await client.request(GET_PROJECT_SLUGS);
    const { projects } = data;

    const paths = projects.map((project) => {
        const { localizations } = project;

        return localizations.map((localization) => {
            return {
                params: {
                    slug: localization.slug.toString(),
                },
                locale: localization.locale.toString(),
            };
        })
    }).flat();

    return {
        paths,
        fallback: false,
    };
};

export async function getStaticProps({ locale, params }) {
    const client = new GraphQLClient(process.env.API_URL);
    const data = await client.request(GET_PROJECT_BY_SLUG, { locale: [locale], slug: params.slug });
    const links = await client.request(GET_PROJECT_SLUGS);

    return {
        props: {
            links,
            data,
            messages: (await import(`../../lang/${locale}.json`)).default,
        }
    };
}
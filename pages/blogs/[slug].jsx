import Seo from '../../components/Seo'
import Header from "../../components/Header";
import { GraphQLClient } from 'graphql-request';
import { useTranslations } from "next-intl";
import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from 'next/image';
import { GET_BLOG_SLUGS, GET_BLOG_BY_SLUG } from "../../config/queries";
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Footer from '../../components/Footer';

const Blog = ({ data, links }) => {
    const router = useRouter();

    const { blogs } = links;
    const blog = data.blogs[0];
    const { query, locale: routerLocale } = router;
    const { title, summary, tags, image, content, date } = blog;
    const { img, alt } = image;
    let blogOtherLang;

    blogs.forEach((_blog) => {
        const { localizations } = _blog;

        const foundBlog = localizations.find((localization) => {
            const { id, locale } = localization;
            return id === blog.id && locale !== router.locale;
        });

        if (foundBlog) blogOtherLang = foundBlog;
    });

    const { locale: otherLangLocale, slug: otherLangSlug } = blogOtherLang;

    const alternates = [
        {
            hrefLang: routerLocale,
            href: routerLocale === 'en' ?
                `${process.env.NEXT_PUBLIC_URL}/blogs/${query.slug}` :
                `${process.env.NEXT_PUBLIC_URL}/${routerLocale}/blogs/${query.slug}`
        },
        {
            hrefLang: otherLangLocale,
            href: otherLangLocale === 'en' ?
                `${process.env.NEXT_PUBLIC_URL}/blogs/${otherLangSlug}` :
                `${process.env.NEXT_PUBLIC_URL}/${otherLangLocale}/blogs/${otherLangSlug}`
        },
    ]

    const b = useTranslations('blog');

    return (
        <div className='blog'>
            <Seo title={title} description={summary}
                alternates={alternates} />
            <Header otherLang={blogOtherLang} />
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
                                {
                                    content ? (
                                        <div className='text' dangerouslySetInnerHTML={{ __html: content.html }} />
                                    ) : (
                                            <p className='mb-3'>
                                                Deze blog moet nog verwerkt worden. Kom later nog eens terug.
                                            </p>
                                    )
                                }
                                <div>
                                    <Link href={'/blogs'}>
                                        <a className='button button_primary button_with_icon'>
                                            <FontAwesomeIcon icon="fa-solid fa-arrow-left-long" role={"button"} />
                                            <span className='font_bold'>{b('back')}</span>
                                        </a>
                                    </Link>
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

export default Blog;

export async function getStaticPaths() {
    const client = new GraphQLClient(process.env.API_URL);
    const data = await client.request(GET_BLOG_SLUGS);
    const { blogs } = data;

    const paths = blogs.map((blog) => {
        const { localizations } = blog;

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
    const data = await client.request(GET_BLOG_BY_SLUG, { locale: [locale], slug: params.slug });
    const links = await client.request(GET_BLOG_SLUGS);

    return {
        props: {
            links,
            data,
            messages: (await import(`../../lang/${locale}.json`)).default,
        }
    };
}
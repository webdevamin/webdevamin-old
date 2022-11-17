import { useTranslations } from "next-intl";
import Head from "next/head";
import { useRouter } from "next/router";

const Seo = ({ title, description, alternates }) => {
    const router = useRouter();

    const t = useTranslations('seo');

    const realTitle = title ? `${title} | Webdevamin` : t('title');
    const realDescription = description ?? t('description');

    let url;

    if (alternates) {
        url = alternates.find((alternate) => {
            return alternate.hrefLang === router.locale;
        });
    }

    return (
        <Head>
            <meta charSet="utf-8" />
            <title>{realTitle}</title>
            <meta name="description" content={realDescription} />
            <meta property="og:title" content={realTitle} />
            <meta property="og:image" content={t('imagePath')} />
            <meta
                property="og:url"
                content={process.env.NEXT_PUBLIC_URL ?? "https://webdevamin.com"}
            />
            <meta property="og:description" content={realDescription} />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {url && <link rel="canonical" href={url.href} />}
            {
                alternates && (
                    alternates.map((alternate, index) => {
                        const { hrefLang, href } = alternate;

                        return (
                            <link rel="alternate" hrefLang={hrefLang}
                                href={href} key={index} />
                        )
                    })
                )
            }
        </Head>
    );
};

export default Seo;
import React from 'react'
import Link from "next/link"
import { useTranslations } from "next-intl"

const socials = [
    {
        name: "Email",
        url: "mailto:amin.m.intichev@gmail.com",
        classIcons: ["fas", "envelope"],
        label: "Contact via mail"
    },
    {
        name: "Facebook",
        url: "https://www.facebook.com/webdevamin/",
        classIcons: ["fab", "facebook"],
        label: "Contact via Facebook"
    },
    {
        name: "Instagram",
        url: "https://www.instagram.com/webdevamin/",
        classIcons: ["fab", "instagram"],
        label: "Contact via Instagram"
    },
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/amin-i-1072391b0/",
        classIcons: ["fab", "linkedin"],
        label: "Contact via LinkedIn"
    },
    {
        name: "GitHub",
        url: "https://github.com/webdevamin/",
        classIcons: ["fab", "github"],
        label: "Contact via GitHub"
    },
];

const Footer = () => {
    const t = useTranslations('header');
    const g = useTranslations('general');

    return (
        <footer>
            <section className='contacts'>
                <h3>Contact</h3>
                <ul>
                    {
                        socials.map((social, index) => {
                            const { name, url } = social;

                            return (
                                <li key={index}>
                                    <a href={url}
                                        rel={'noreferrer'}
                                        target='_blank'
                                        className={`small_link`}>
                                        <span>{name}</span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </section>
            <section>
                <h3>Links</h3>
                <ul>
                    <li>
                        <Link href='/'>
                            <a>{t('nav.home')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/projects'>
                            <a>{t('nav.projects')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/blogs'>
                            <a>{t('nav.blogs')}</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/faq'>
                            <a>{t('nav.faq')}</a>
                        </Link>
                    </li>
                </ul>
            </section>
            <section>
                <h3>{g('services.name')}</h3>
                <ul>
                    {
                        (g('services.data')
                            .split(","))
                            .map((service, index) => {
                                return (
                                    <li key={index}>
                                        {service}
                                    </li>
                                )
                            })
                    }
                </ul>
            </section>
        </footer>
    )
}

export default Footer;
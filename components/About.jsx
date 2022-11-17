import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { useTranslations } from "next-intl";
import React from "react";

const About = () => {
    const t = useTranslations('about');

    return (
        <section className='about'>
            <p className='text content mb-2'>
                {t('text')} {' '}
            </p>
            <div className="buttons">
                <div className="button button_primary">
                    <a rel="noreferrer" target='_blank'
                        href={`mailto:amin.m.intichev@gmail.com`}>
                        Contact
                    </a>
                </div>
                <div className="button button_primary">
                    <a rel="noreferrer" target='_blank' href={t('resume.link')}>
                        <span>{t('resume.text')}</span>
                        <FontAwesomeIcon icon={faArrowRightLong} size={'xs'} />
                    </a>
                </div>
            </div>
        </section>
    )
}

export default About;
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import React from "react";
import Image from 'next/image';
import { useTranslations } from "next-intl";

const Card = ({ item, prefixLink, showSummary }) => {
    const { title, image, slug, summary } = item;
    const { alt, img } = image;
    const link = prefixLink + slug;

    const g = useTranslations('general');

    return (
        <article className="card">
            <div className='image_container'>
                <Image src={img.url} alt={alt}
                    layout="fill" objectFit='cover'
                    className='radius-md'/>
            </div>
            <div className='card_footer'>
                <h3 className={!showSummary ? 'foreground_color' : ''}>{title}</h3>
                {
                    showSummary && (
                        <p>{summary}</p>
                    )
                }
                <Link href={link}>
                    <a className='link'>
                        <span>{g('readMore')}</span>
                        <FontAwesomeIcon icon={faArrowRightLong} size={'xs'} />
                    </a>
                </Link>
            </div>
        </article>
    )
}

export default Card;
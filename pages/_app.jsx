import Head from "next/head";
import "../styles/app.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { NextIntlProvider } from 'next-intl';
import { ThemeProvider } from 'next-themes';
import { AnimatePresence, motion } from "framer-motion";

import { library } from '@fortawesome/fontawesome-svg-core' //allows later to just use icon name to render-them
import { faGithub, faInstagram, faLinkedin, faFacebook } from '@fortawesome/free-brands-svg-icons'
import {
  faEnvelope, faEye, faSun, faMoon,
  faArrowLeftLong, faCalendarDay
} from '@fortawesome/free-solid-svg-icons';
import Script from "next/script";
config.autoAddCss = false;

library.add(faGithub, faInstagram, faLinkedin, faFacebook, faEnvelope,
  faEye, faSun, faMoon, faArrowLeftLong, faCalendarDay);

const spring = {
  type: "spring",
  damping: 20,
  stiffness: 300,
  when: "afterChildren"
};

const MyApp = ({ Component, pageProps, router }) => {
  return (
    <>
      <Script async strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_G_ANALYTICS}`} />
      <Script id="script_id" strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_G_ANALYTICS}', {
            page_path: window.location.pathname,
            });
        `}
      </Script>
      <ThemeProvider defaultTheme="system">
        <NextIntlProvider messages={pageProps.messages}>
          <AnimatePresence exitBeforeEnter initial={true}>
            <motion.div
              transition={spring}
              key={router.pathname}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              id="page-transition-container"
            >
              <Component {...pageProps} key={router.route} />
            </motion.div>
          </AnimatePresence>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
        </NextIntlProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp;

import Seo from '../components/Seo'
import About from '../components/About';
import Header from "../components/Header";
import React from 'react';
import Hero from '../components/Hero';
import Layout from "../components/Layout";
import Footer from '../components/Footer';

const alternates = [
  {
    hrefLang: "en",
    href: process.env.NEXT_PUBLIC_URL
  },
  {
    hrefLang: "nl",
    href: `${process.env.NEXT_PUBLIC_URL}/nl`
  },
];

const Index = () => {
  return (
    <>
      <Seo alternates={alternates} />
      <Header />
      <Layout>
        <Hero intro={true} />
        <main>
          <About />
        </main>
      </Layout>
      <Footer />
    </>
  )
}

export default Index;

export async function getStaticProps({ locale }) {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended
      // pattern is to put them in JSON files separated by language and read
      // the desired one based on the `locale` received from Next.js.
      messages: (await import(`../lang/${locale}.json`)).default,
    }
  };
}
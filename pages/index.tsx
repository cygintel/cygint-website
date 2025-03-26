
import Head from 'next/head';
import Header from "../client/src/components/layout/Header";
import Footer from "../client/src/components/layout/Footer";
import Hero from "../client/src/components/sections/Hero";
import Stats from "../client/src/components/sections/Stats";
import Features from "../client/src/components/sections/Features";
import PlatformOverview from "../client/src/components/sections/PlatformOverview";
import Services from "../client/src/components/sections/Services";
import Testimonials from "../client/src/components/sections/Testimonials";
import Pricing from "../client/src/components/sections/Pricing";
import Contact from "../client/src/components/sections/Contact";
import CTA from "../client/src/components/sections/CTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>Cygint - Attack Surface Management & IoT Security</title>
        <meta name="description" content="Cygint - Comprehensive attack surface management and IoT security solutions for organizations of all sizes." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Sans:wght@300;400;500;600;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@300;400;500;600;700&display=swap" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Hero />
          <Stats />
          <Features />
          <PlatformOverview />
          <Services />
          <Testimonials />
          <Pricing />
          <Contact />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
}

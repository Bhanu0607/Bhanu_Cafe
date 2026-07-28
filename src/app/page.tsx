"use client";

import { ThemeProvider } from "@/components/ui/ThemeProvider";
import LoadingScreen from "@/components/ui/LoadingScreen";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import HowItWorks from "@/components/sections/HowItWorks";
import Pricing from "@/components/sections/Pricing";
import Documents from "@/components/sections/Documents";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import BackToTop from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <HowItWorks />
        <Pricing />
        <Documents />
        <Testimonials />
        <Gallery />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </ThemeProvider>
  );
}

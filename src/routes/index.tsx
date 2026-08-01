import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";
import { GlobalPresence } from "@/components/site/GlobalPresence";
import { Hero } from "@/components/site/Hero";
import { Industries } from "@/components/site/Industries";
import { Insights } from "@/components/site/Insights";
import { Navbar } from "@/components/site/Navbar";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Services } from "@/components/site/Services";
import { WhoWeAre } from "@/components/site/WhoWeAre";

export const Route = createFileRoute("/")({
  component: HomePage,
});

import { SiteContentProvider } from "@/context/SiteContentProvider";
import { ContentVersionToggle } from "@/components/site/ContentVersionToggle";
import { SiteSeo } from "@/components/site/SiteSeo";

function HomePage() {
  return (
    <SiteContentProvider>
      <SiteSeo />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <Industries />
      <WhoWeAre />
      <About />
      <Services />
      <GlobalPresence />
      <Insights />
      <Contact />
      <Footer />
      <ContentVersionToggle />
    </SiteContentProvider>
  );
}

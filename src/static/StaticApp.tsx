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
import { SiteSeo } from "@/components/site/SiteSeo";
import { WhoWeAre } from "@/components/site/WhoWeAre";
import { SiteContentProvider } from "@/context/SiteContentProvider";

/** Client-only shell for static hosting (no TanStack Start / SSR). */
export function StaticApp() {
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
    </SiteContentProvider>
  );
}

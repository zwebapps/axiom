import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { Footer } from "@/components/site/Footer";
import { GlobalPresence } from "@/components/site/GlobalPresence";
import { Hero } from "@/components/site/Hero";
import { Industries } from "@/components/site/Industries";
import { Insights } from "@/components/site/Insights";
import { Navbar } from "@/components/site/Navbar";
import { Services } from "@/components/site/Services";
import { WhoWeAre } from "@/components/site/WhoWeAre";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Industries />
      <WhoWeAre />
      <About />
      <Services />
      <GlobalPresence />
      <Insights />
      <Footer />
    </>
  );
}

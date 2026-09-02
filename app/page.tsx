import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/hero/Hero";
import { CaseStudySection } from "@/components/work/CaseStudySection";
import { Distribution } from "@/components/work/Distribution";
import { Experiments } from "@/components/work/Experiments";
import { Capabilities } from "@/components/sections/Capabilities";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { featured } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />

        <h2 className="sr-only" id="work">
          Selected work
        </h2>
        {featured.map((study) => (
          <CaseStudySection key={study.slug} study={study} />
        ))}
        <Distribution />
        <Experiments />

        <Capabilities />
        <Infrastructure />
        <About />
        <Contact />
      </main>
    </>
  );
}

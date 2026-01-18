import { HeroSection } from "@vert/components/sections/hero";
import { ProblemSection } from "@vert/components/sections/problem";
import { SolutionSection } from "@vert/components/sections/solution";
import { TriagemSection } from "@vert/components/sections/triagem";
import { HorizontalsSection } from "@vert/components/sections/horizontals";
import { HowItWorksSection } from "@vert/components/sections/how-it-works";
import { ComplexityLevelsSection } from "@vert/components/sections/complexity-levels";
import { PrinciplesSection } from "@vert/components/sections/principles";
import { ResultsSection } from "@vert/components/sections/results";
// import { CaseStudiesSection } from "@vert/components/sections/case-studies"; // TODO: Habilitar depois
import { PartnershipSection } from "@vert/components/sections/partnership";
import { CTASection } from "@vert/components/sections/cta";
import { FAQSection } from "@vert/components/sections/faq";
import { Footer } from "@vert/components/sections/footer";
import { LandingNavbar } from "@vert/components/layout/navbar";
import { SectionProgress } from "@vert/components/layout/section-progress";

export default function Page() {
  return (
    <>
      <LandingNavbar />
      <SectionProgress />
      <main>
        <HeroSection />
        <ProblemSection />
        <TriagemSection />
        <SolutionSection />
        <HorizontalsSection />
        <HowItWorksSection />
        <ComplexityLevelsSection />
        <PrinciplesSection />
        <PartnershipSection />
        {/* <CaseStudiesSection /> */}{/* TODO: Habilitar depois */}
        <ResultsSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </>
  );
}
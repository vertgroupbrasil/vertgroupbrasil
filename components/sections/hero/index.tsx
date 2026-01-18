import { HeroBackground } from "./hero-background";
import { HeroTitle } from "./hero-title";
import { HeroDescription } from "./hero-description";
import { HeroActions } from "./hero-actions";
import { HeroGlow } from "./hero-glow";
import { HeroFloatingIcons } from "./hero-floating-icons";
import { HeroScrollIndicator } from "./hero-scroll-indicator";

const HERO_CONTENT = {
  titleParts: [
    "Sua empresa cresce, mas você não descansa.",
    "Tudo depende de você. Sempre você.",
    "Processos mudam toda semana.",
    "Você não confia nos números que recebe.",
  ],
  highlight: "A gente resolve isso.",
  description:
    "Organizamos operações de verdade. Sem promessas vazias, sem PowerPoint bonito que vira gaveta. Entramos na sua empresa, entendemos o sistema e construímos junto.",
  primaryAction: "Quero organizar minha operação",
} as const;

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      <HeroBackground />
      <HeroGlow />
      <HeroFloatingIcons />

      <div className="relative z-10 flex flex-col items-center pointer-events-auto">
        <HeroTitle 
          titleParts={HERO_CONTENT.titleParts} 
          highlight={HERO_CONTENT.highlight} 
        />

        <HeroDescription text={HERO_CONTENT.description} />

        <HeroActions primaryLabel={HERO_CONTENT.primaryAction} />
      </div>

      <HeroScrollIndicator />
    </section>
  );
}

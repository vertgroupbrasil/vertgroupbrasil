"use client";

import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  IconBulb,
  IconRocket,
  IconTarget,
  IconSparkles,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";
import { MagicCard } from "@vert/components/ui/magic/magic-card";
import { OrbitingCircles } from "@vert/components/ui/magic/orbiting-circles";
import { AuroraText } from "@vert/components/ui/magic/aurora-text";
import { Highlighter } from "@vert/components/ui/magic/highlighter";

const LEFT_CARD = {
  title: "Às vezes, durante o Atlas, surge algo maior.",
  subtitle: "Um software interno que resolve uma dor comum no setor. Uma solução que não depende de customização extrema. Potencial real de produto.",
  items: [
    "Produto escalável",
    "Solução reutilizável",
    "Nova linha de receita",
  ],
};

const RIGHT_CARD = {
  title: "Quando isso acontece, propomos o Forge.",
  subtitle: "Transformamos o que nasceu na operação em produto de mercado  com validação, posicionamento e desenvolvimento.",
  items: [
    "Co-criação de verdade",
    "Pele em jogo dos dois lados",
    "Sucesso compartilhado",
  ],
};

function OrbitingBackground({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none opacity-30">
      <OrbitingCircles
        radius={280}
        duration={40}
        path={true}
        iconSize={40}
        speed={0.5}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
          <IconBulb className="h-5 w-5" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
          <IconRocket className="h-5 w-5" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
          <IconTrendingUp className="h-5 w-5" />
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary border border-primary/30">
          <IconUsers className="h-5 w-5" />
        </div>
      </OrbitingCircles>
      <OrbitingCircles
        radius={180}
        duration={30}
        path={true}
        iconSize={32}
        speed={0.7}
        reverse
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20">
          <IconSparkles className="h-4 w-4" />
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary border border-primary/20">
          <IconTarget className="h-4 w-4" />
        </div>
      </OrbitingCircles>
    </div>
  );
}

export function PartnershipSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showHeavy, setShowHeavy] = useState(true);

  // Detect mobile and reduced motion
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowHeavy(!isMobile && !prefersReducedMotion);
  }, []);

  return (
    <section
      ref={ref}
      id="parceria"
      className="relative py-24 px-4"
    >
      {/* Glow de fundo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
        <div className="h-[600px] w-[900px] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      {/* Orbiting circles background (desktop only, no reduced motion) */}
      <OrbitingBackground show={showHeavy} />

      <div className="relative mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            <AuroraText colors={["#10b981", "#14b8a6", "#059669", "#34d399"]} speed={showHeavy ? 1.5 : 0}>
              Crescemos
            </AuroraText>{" "}
            quando{" "}
            <Highlighter  
              action="circle"
              color="#10b981"
              strokeWidth={3}
              animationDuration={showHeavy ? 1000 : 0}
              iterations={showHeavy ? 2 : 0}
              padding={11}
              isView={showHeavy}
            >
              você
            </Highlighter>{" "}
            cresce.
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Por isso, trabalhamos em parceria  não como fornecedores.
          </p>
        </motion.div>

        {/* Cards com MagicCard */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Card Esquerdo */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <MagicCard
              className="h-full rounded-2xl"
              gradientSize={showHeavy ? 300 : 0}
              gradientColor={showHeavy ? "rgba(16, 185, 129, 0.15)" : "transparent"}
              gradientFrom={showHeavy ? "#10b981" : "transparent"}
              gradientTo={showHeavy ? "#059669" : "transparent"}
              gradientOpacity={showHeavy ? 0.1 : 0}
            >
              <div className="relative h-full p-8">
                {/* Ícone decorativo */}
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconSparkles className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 pr-12 leading-tight">
                  {LEFT_CARD.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {LEFT_CARD.subtitle}
                </p>

                <ul className="space-y-3">
                  {LEFT_CARD.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">
                        ✔
                      </span>
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </MagicCard>
          </motion.div>

          {/* Card Direito */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          >
            <MagicCard
              className="h-full rounded-2xl"
              gradientSize={showHeavy ? 300 : 0}
              gradientColor={showHeavy ? "rgba(16, 185, 129, 0.15)" : "transparent"}
              gradientFrom={showHeavy ? "#059669" : "transparent"}
              gradientTo={showHeavy ? "#10b981" : "transparent"}
              gradientOpacity={showHeavy ? 0.1 : 0}
            >
              <div className="relative h-full p-8">
                {/* Ícone decorativo */}
                <div className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <IconTarget className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-4 pr-12">
                  {RIGHT_CARD.title}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {RIGHT_CARD.subtitle}
                </p>

                <ul className="space-y-3">
                  {RIGHT_CARD.items.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">
                        ✔
                      </span>
                      <span className="text-foreground font-medium">{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  IconCircle,
  IconCircles,
  IconTopologyRing3,
  IconCheck,
  IconArrowRight,
} from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";
import { MagicCard } from "@vert/components/ui/magic/magic-card";

const COMPLEXITY_LEVELS = [
  {
    level: 1,
    name: "Vetor Operacional",
    icon: IconCircle,
    description: "Poucos setores, baixa dependência entre eles, decisões centralizadas.",
    characteristics: [
      "Estrutura enxuta",
      "Processos simples",
      "Decisões rápidas",
      "Dados básicos",
    ],
    gradient: "from-emerald-400 to-emerald-500",
    bgGradient: "from-emerald-500/10 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    textColor: "text-emerald-500",
  },
  {
    level: 2,
    name: "Vetor Integrado",
    icon: IconCircles,
    description: "Vários setores, dependência moderada, falhas pontuais de processo.",
    characteristics: [
      "Múltiplas áreas",
      "Integração necessária",
      "Gargalos identificáveis",
      "Dados dispersos",
    ],
    gradient: "from-amber-400 to-amber-500",
    bgGradient: "from-amber-500/10 to-amber-500/5",
    borderColor: "border-amber-500/30",
    textColor: "text-amber-500",
  },
  {
    level: 3,
    name: "Vetor Sistêmico",
    icon: IconTopologyRing3,
    description: "Múltiplos setores, forte interdependência, gargalos recorrentes, dados inconsistentes.",
    characteristics: [
      "Alta complexidade",
      "Interdependência total",
      "Processos críticos",
      "Decisões de alto impacto",
    ],
    gradient: "from-rose-400 to-rose-500",
    bgGradient: "from-rose-500/10 to-rose-500/5",
    borderColor: "border-rose-500/30",
    textColor: "text-rose-500",
  },
];

export function ComplexityLevelsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="complexidade"
      className="relative py-24 px-4"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <IconTopologyRing3 className="h-4 w-4" />
            Cada empresa é única
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Entendemos seu sistema
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Na triagem, classificamos o nível de complexidade da sua empresa. Isso nos ajuda a propor exatamente o que faz sentido  sem exagero, sem lacuna.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {COMPLEXITY_LEVELS.map((level, index) => {
            const Icon = level.icon;
            return (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 40, filter: "blur(15px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{ duration: 0.7, delay: 0.2 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <MagicCard
                  className="h-full rounded-2xl"
                  gradientSize={300}
                  gradientColor={`rgba(${level.level === 1 ? '16, 185, 129' : level.level === 2 ? '245, 158, 11' : '244, 63, 94'}, 0.12)`}
                >
                  <div className="p-6 h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br",
                        level.gradient
                      )}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <span className={cn(
                        "text-4xl font-bold opacity-20",
                        level.textColor
                      )}>
                        {level.level}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {level.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-6 flex-grow">
                      {level.description}
                    </p>

                    {/* Characteristics */}
                    <div className="space-y-2">
                      {level.characteristics.map((char) => (
                        <div
                          key={char}
                          className="flex items-center gap-2 text-sm"
                        >
                          <IconCheck className={cn("h-4 w-4 shrink-0", level.textColor)} />
                          <span className="text-foreground/80">{char}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border/50"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-1">
              <h4 className="font-semibold text-foreground mb-1">
                Por que isso importa?
              </h4>
              <p className="text-sm text-muted-foreground">
                Uma empresa com 3 setores não precisa do mesmo trabalho que uma com 15 áreas interdependentes. 
                Entender a complexidade nos permite propor o que realmente faz sentido  nem mais, nem menos.
                <button
                  className="text-foreground font-medium underline underline-offset-2 hover:text-primary transition-colors"
                  onClick={() => {
                    const el = document.getElementById("triagem");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  type="button"
                >
                  Tudo é definido na triagem, antes de começar.
                </button>
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm text-primary font-medium shrink-0">
              <button
                className="inline-flex items-center gap-1 text-primary font-medium underline underline-offset-2 hover:text-foreground transition-colors"
                onClick={() => {
                  const el = document.getElementById("triagem");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                type="button"
              >
                Definido na triagem
                <IconArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

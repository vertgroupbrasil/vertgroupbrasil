"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  IconMap,
  IconSearch,
  IconListCheck,
  IconCpu,
  IconRocket,
  IconChevronRight,
} from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";
import { MagicCard } from "@vert/components/ui/magic/magic-card";

const SERVICES = [
  {
    id: "mapear",
    icon: IconMap,
    title: "Mapear",
    description: "Entendemos sua operação hoje e documentamos cada etapa.",
    highlight: "Visão clara do negócio",
  },
  {
    id: "diagnosticar",
    icon: IconSearch,
    title: "Diagnosticar",
    description: "Revelamos gargalos e oportunidades reais.",
    highlight: "Problemas reais expostos",
  },
  {
    id: "estruturar",
    icon: IconListCheck,
    title: "Estruturar",
    description: "Organizamos processos e implementamos melhorias.",
    highlight: "Processos que funcionam",
  },
  {
    id: "automatizar",
    icon: IconCpu,
    title: "Automatizar",
    description: "Aplicamos tecnologia onde ela faz sentido.",
    highlight: "Tecnologia com propósito",
  },
  {
    id: "escalar",
    icon: IconRocket,
    title: "Escalar",
    description: "Monitoramos, ajustamos e guiamos a evolução.",
    highlight: "Pronto para crescer",
  },
];

export function WhatWeDoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeService = SERVICES[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section
      ref={ref}
      id="solucoes"
      className="relative py-24 px-4"
    >
      <div className="mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Como trabalhamos
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Um método direto em 5 etapas
          </p>
        </motion.div>

        {/* Layout lado a lado */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
          {/* Tabs à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-1 lg:w-[280px] lg:shrink-0"
          >
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeIndex === index;
              
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "group flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-300",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "hover:bg-muted/80"
                  )}
                >
                  <div className={cn(
                    "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors",
                    isActive 
                      ? "bg-white/20" 
                      : "bg-muted group-hover:bg-primary/10"
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : "text-muted-foreground group-hover:text-primary"
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "font-semibold text-sm block",
                      isActive ? "text-white" : "text-foreground"
                    )}>
                      {service.title}
                    </span>
                  </div>

                  <IconChevronRight className={cn(
                    "h-4 w-4 shrink-0 transition-all",
                    isActive 
                      ? "opacity-100 text-white" 
                      : "opacity-0 group-hover:opacity-50"
                  )} />
                </button>
              );
            })}
          </motion.div>

          {/* Card à direita */}
          <motion.div
            initial={{ opacity: 0, x: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="flex-1 min-w-0"
          >
            <MagicCard
              className="rounded-2xl"
              gradientSize={400}
              gradientColor="rgba(16, 185, 129, 0.12)"
              gradientFrom="#10b981"
              gradientTo="#059669"
              gradientOpacity={0.08}
            >
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative p-8 lg:p-10"
              >
                {/* Número grande de fundo */}
                <div className="absolute right-6 top-6 text-[120px] font-bold text-primary/5 select-none leading-none">
                  {String(activeIndex + 1).padStart(2, '0')}
                </div>

                <div className="relative">
                  {/* Ícone */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
                    <ActiveIcon className="h-8 w-8" />
                  </div>

                  {/* Título */}
                  <h3 className="text-3xl font-bold text-foreground mb-4">
                    {activeService.title}
                  </h3>

                  {/* Descrição */}
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-lg">
                    {activeService.description}
                  </p>

                  {/* Highlight badge */}
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-5 py-2.5 text-sm font-medium text-primary">
                    <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    {activeService.highlight}
                  </div>
                </div>
              </motion.div>
            </MagicCard>
          </motion.div>
        </div>

        {/* Tags de rodapé */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
          className="mt-16 flex flex-wrap justify-center gap-4 text-center"
        >
          <span className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            Sem complicar.
          </span>
          <span className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            Sem promessas vazias.
          </span>
          <span className="rounded-full border border-border bg-background/50 px-4 py-2 text-sm font-medium text-muted-foreground backdrop-blur-sm">
            Resultados reais.
          </span>
        </motion.div>
      </div>
    </section>
  );
}

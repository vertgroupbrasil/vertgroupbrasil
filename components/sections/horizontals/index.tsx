"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  IconBrain,
  IconSettings,
  IconChartBar,
  IconPalette,
  IconRocket,
  IconCode,
  IconChevronRight,
  IconCheck,
} from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";
import { MagicCard } from "@vert/components/ui/magic/magic-card";

const HORIZONTALS = [
  {
    id: "core",
    icon: IconBrain,
    name: "Core",
    tagline: "Presença e pensamento estrutural",
    description: "É o tempo que passamos presentes na sua empresa. Sentamos com líderes, acompanhamos a operação de perto, explicitamos decisões que estavam na cabeça de alguém e registramos as regras do negócio.",
    whenUsed: "Sempre presente. Nenhum projeto existe sem Core.",
    deliverables: ["Direcionamentos claros", "Decisões documentadas", "Regras do sistema"],
    color: "emerald",
  },
  {
    id: "process",
    icon: IconSettings,
    name: "Process",
    tagline: "Engenharia de processos",
    description: "Observamos como pedidos entram, onde travam, como exceções são tratadas. Desenhamos processos reais, não os ideais.",
    whenUsed: "Quando há gargalos, retrabalho ou cada área funciona do seu jeito.",
    deliverables: ["Processos definidos", "Fluxos documentados", "Responsabilidades claras"],
    color: "teal",
  },
  {
    id: "data",
    icon: IconChartBar,
    name: "Data",
    tagline: "Estruturação de métricas",
    description: "Organização de indicadores e fontes de dados. Quando você reconstrói números manualmente todo mês, é aqui que resolvemos.",
    whenUsed: "Quando os números não são confiáveis.",
    deliverables: ["Indicadores definidos", "Métricas operacionais", "Dados confiáveis"],
    color: "cyan",
  },
  {
    id: "brand",
    icon: IconPalette,
    name: "Brand",
    tagline: "Identidade e posicionamento",
    description: "Definição de posicionamento, criação ou ajuste de identidade visual e direção de comunicação.",
    whenUsed: "Quando o produto ou empresa precisa se apresentar.",
    deliverables: ["Identidade visual", "Direcionamento de marca", "Materiais-base"],
    color: "violet",
  },
  {
    id: "gtm",
    icon: IconRocket,
    name: "Go-to-Market",
    tagline: "Validação e entrada no mercado",
    description: "Validação de público, definição de proposta de valor e estratégia inicial de aquisição. Testamos hipóteses antes de construir.",
    whenUsed: "Quando existe produto ou ideia que precisa ir para o mercado.",
    deliverables: ["Hipóteses validadas", "Direção de mercado", "Estratégia de entrada"],
    color: "amber",
  },
  {
    id: "engine",
    icon: IconCode,
    name: "Engine",
    tagline: "Engenharia de software",
    description: "Desenvolvimento de sistemas que sustentam a operação. Não é produto por si só. É infraestrutura que faz o resto funcionar.",
    whenUsed: "Quando processos precisam ser acompanhados digitalmente.",
    deliverables: ["Software funcional", "Infraestrutura técnica", "Documentação"],
    color: "rose",
  },
];

const COLOR_CLASSES = {
  emerald: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-500",
    glow: "rgba(16, 185, 129, 0.15)",
  },
  teal: {
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    text: "text-teal-500",
    glow: "rgba(20, 184, 166, 0.15)",
  },
  cyan: {
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20",
    text: "text-cyan-500",
    glow: "rgba(6, 182, 212, 0.15)",
  },
  violet: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/20",
    text: "text-violet-500",
    glow: "rgba(139, 92, 246, 0.15)",
  },
  amber: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    text: "text-amber-500",
    glow: "rgba(245, 158, 11, 0.15)",
  },
  rose: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/20",
    text: "text-rose-500",
    glow: "rgba(244, 63, 94, 0.15)",
  },
};

export function HorizontalsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);
  const activeHorizontal = HORIZONTALS[activeIndex];
  const ActiveIcon = activeHorizontal.icon;
  const colors = COLOR_CLASSES[activeHorizontal.color as keyof typeof COLOR_CLASSES];

  return (
    <section
      ref={ref}
      id="horizontais"
      className="relative py-24 px-4"
    >
      <div className="mx-auto max-w-6xl">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
            <IconSettings className="h-4 w-4" />
            Módulos de trabalho
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Horizontais
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            <strong className="text-foreground">Horizontais são camadas de atuação que atravessam qualquer serviço da Vert.</strong>
          </p>
          <p className="mt-3 text-base text-muted-foreground max-w-3xl mx-auto">
            Cada horizontal é um módulo que adicionamos ao projeto de acordo com a necessidade e vontade do cliente. Na triagem, identificamos quais fazem sentido para o seu contexto.
          </p>
        </motion.div>

        {/* Layout lado a lado */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch mt-12">
          {/* Tabs à esquerda */}
          <motion.div
            initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col gap-1 lg:w-[280px] lg:shrink-0"
          >
            {HORIZONTALS.map((horizontal, index) => {
              const Icon = horizontal.icon;
              const isActive = activeIndex === index;
              const hColors = COLOR_CLASSES[horizontal.color as keyof typeof COLOR_CLASSES];
              
              return (
                <button
                  key={horizontal.id}
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
                      : cn(hColors.bg, hColors.border, "border")
                  )}>
                    <Icon className={cn(
                      "h-5 w-5",
                      isActive ? "text-white" : hColors.text
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <span className={cn(
                      "font-semibold text-sm block",
                      isActive ? "text-white" : "text-foreground"
                    )}>
                      {horizontal.name}
                    </span>
                    <span className={cn(
                      "text-xs block truncate",
                      isActive ? "text-white/70" : "text-muted-foreground"
                    )}>
                      {horizontal.tagline}
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
              className="rounded-2xl h-full"
              gradientSize={400}
              gradientColor={colors.glow}
              gradientFrom={colors.text.replace("text-", "#").replace("-500", "")}
              gradientTo="transparent"
              gradientOpacity={0.1}
            >
              <div className="p-8 h-full">
                {/* Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-xl border",
                    colors.bg,
                    colors.border
                  )}>
                    <ActiveIcon className={cn("h-7 w-7", colors.text)} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {activeHorizontal.name}
                    </h3>
                    <p className={cn("text-sm font-medium", colors.text)}>
                      {activeHorizontal.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {activeHorizontal.description}
                </p>

                {/* When used */}
                <div className="mb-6 p-4 rounded-xl bg-muted/50 border border-border/50">
                  <p className="text-sm font-medium text-foreground mb-1">Quando entra:</p>
                  <p className="text-sm text-muted-foreground">{activeHorizontal.whenUsed}</p>
                </div>

                {/* Deliverables */}
                <div>
                  <p className="text-sm font-medium text-foreground mb-3">Entregáveis:</p>
                  <div className="flex flex-wrap gap-2">
                    {activeHorizontal.deliverables.map((deliverable) => (
                      <div
                        key={deliverable}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground"
                      >
                        <IconCheck className="h-3.5 w-3.5 text-primary" />
                        {deliverable}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MagicCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

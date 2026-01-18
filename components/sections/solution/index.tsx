"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { 
  IconCompass, 
  IconHammer, 
  IconCheck,
  IconCircleCheck,
  IconChartLine,
  IconTargetArrow,
  IconBulb,
  IconTrendingUp,
  IconSparkles,
  IconBolt,
  IconBuilding,
  IconRocket,
} from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";
import { Highlighter } from "@vert/components/ui/magic/highlighter";
import { OrbitingCircles } from "@vert/components/ui/magic/orbiting-circles";
import { LightRays } from "@vert/components/ui/magic/light-rays";

const SOLUTIONS = [
  {
    icon: IconCompass,
    name: "Atlas",
    title: "Consultoria Estrutural e Operacional",
    description: "Para empresas que já funcionam, mas crescem de forma desorganizada. Entramos na operação, entendemos o sistema e organizamos de verdade.",
    features: [
      "Diagnóstico do sistema real",
      "Processos claros e documentados",
      "Decisões que saem da cabeça para o papel",
      "Software que sustenta a operação",
    ],
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    icon: IconHammer,
    name: "Forge",
    title: "Construção e Co-criação de Produtos",
    description: "Quando uma dor recorrente tem potencial de virar produto. Construímos junto, do zero ao mercado  com pele em jogo.",
    features: [
      "Da ideia à validação",
      "Estratégia e posicionamento",
      "Desenvolvimento completo",
      "Participação no resultado",
    ],
    gradient: "from-teal-500 to-cyan-600",
  },
] as const;

export function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [isDesktop, setIsDesktop] = useState(false);
  
  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
  }, []);
  
  // Desabilitar efeitos pesados em mobile
  const showHeavyEffects = isDesktop && !prefersReducedMotion;

  return (
    <section
      ref={ref}
      id="servicos"
      className="relative py-24 px-4"
    >
      {/* Background gradient sutil */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/8 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <IconCircleCheck className="h-4 w-4" />
            Nossos serviços
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Duas formas de{" "}
              <Highlighter
                action="highlight"
                color="var(--primary)"
                strokeWidth={2}
                animationDuration={800}
                iterations={1}
                isView={true}
              >
                trabalhar junto
              </Highlighter>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-3xl mx-auto"
          >
            Primeiro entendemos seu sistema na triagem. Depois escolhemos o serviço certo e montamos as horizontais que fazem sentido para você.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="relative">
          {/* Toque positivo sutil - apenas desktop */}
          {showHeavyEffects && (
            <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
              <LightRays
                count={5}
                blur={42}
                speed={16}
                length="56vh"
                color="color-mix(in oklch, var(--primary) 22%, transparent)"
              />
            </div>
          )}

          {/* Glow atrás dos cards */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            {showHeavyEffects ? (
              <>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(0px)" }}
                  animate={isInView ? { opacity: 1, scale: 1, filter: "blur(110px)" } : {}}
                  transition={{ duration: 1.1, ease: "easeOut" }}
                  className="absolute h-[420px] w-[520px] rounded-full bg-primary/25"
                />
                <motion.div
                  initial={{ opacity: 0, filter: "blur(0px)" }}
                  animate={isInView ? { opacity: 0.7, filter: "blur(95px)" } : {}}
                  transition={{ duration: 1.3, delay: 0.15, ease: "easeOut" }}
                  className="absolute h-[300px] w-[640px] -translate-y-10 rounded-full bg-primary/18"
                />
              </>
            ) : (
              <div className="absolute h-[300px] w-[400px] rounded-full bg-primary/15 blur-[80px]" />
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
            {SOLUTIONS.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.name}
                  initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                  animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                  className="relative"
                >
                  {/* Orbiting circles ao redor de cada card - apenas desktop */}
                  {showHeavyEffects && (
                    <div className="absolute inset-0 hidden lg:flex items-center justify-center pointer-events-none z-0">
                      <OrbitingCircles
                        className="border-none bg-transparent"
                        duration={20 + index * 5}
                        radius={200}
                        path={true}
                        iconSize={32}
                        speed={0.5}
                        reverse={index === 1}
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/35 backdrop-blur-md text-primary border border-primary/20 shadow-sm ring-1 ring-primary/10">
                          <IconTrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/35 backdrop-blur-md text-primary border border-primary/20 shadow-sm ring-1 ring-primary/10">
                          <IconChartLine className="h-4 w-4" />
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/35 backdrop-blur-md text-primary border border-primary/20 shadow-sm ring-1 ring-primary/10">
                          {index === 0 ? <IconBuilding className="h-4 w-4" /> : <IconRocket className="h-4 w-4" />}
                        </div>
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background/35 backdrop-blur-md text-primary border border-primary/20 shadow-sm ring-1 ring-primary/10">
                          {index === 0 ? <IconTargetArrow className="h-4 w-4" /> : <IconBulb className="h-4 w-4" />}
                        </div>
                      </OrbitingCircles>
                    </div>
                  )}

                  {/* Card */}
                  <div className={cn(
                    "group relative h-full min-h-[380px] rounded-3xl p-8 z-10",
                    "bg-gradient-to-br", solution.gradient,
                    "transition-all duration-500 hover:scale-[1.02]"
                  )}>
                    {/* Conteúdo */}
                    <div className="relative z-10">
                      {/* Nome do serviço */}
                      <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-white border border-white/30">
                        <Icon className="h-4 w-4" />
                        {solution.name}
                      </div>
                      
                      <h3 className="mb-3 text-xl font-bold text-white md:text-2xl">
                        {solution.title}
                      </h3>
                      <p className="text-base text-white/90 leading-relaxed mb-6">
                        {solution.description}
                      </p>

                      {/* Features list */}
                      <ul className="space-y-2">
                        {solution.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-white/85">
                            <IconCheck className="h-4 w-4 text-white/90 shrink-0" strokeWidth={2.5} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground">
              <IconTargetArrow className="h-4 w-4 text-primary" />
              Triagem antes de tudo
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground">
              <IconChartLine className="h-4 w-4 text-primary" />
              Execução transparente
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm text-foreground">
              <IconSparkles className="h-4 w-4 text-primary" />
              Presença real na operação
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { AnimatedBeam } from "@vert/components/ui/magic/animated-beam";
import { IconSearch, IconCompass, IconCalendarCheck, IconSparkles } from "@tabler/icons-react";

const STEPS = [
  {
    number: "1",
    title: "Triagem",
    subtitle: "Entender o sistema",
    description: "Uma conversa estruturada para entender como sua empresa funciona de verdade. Não é diagnóstico profundo  é classificação. Ao final, sabemos exatamente o que faz sentido propor.",
    icon: IconSearch,
  },
  {
    number: "2",
    title: "Execução",
    subtitle: "Mão na massa",
    description: "Entramos na operação. Sentamos com líderes, acompanhamos processos reais, desenhamos soluções que funcionam no seu contexto  não no PowerPoint.",
    icon: IconCompass,
  },
  {
    number: "3",
    title: "Mesa de Controle",
    subtitle: "Todo mês, juntos",
    description: "O momento de transparência total. Mostramos o que foi feito, as decisões tomadas, os avanços reais. Ajustamos o rumo juntos. Nada é escondido.",
    icon: IconCalendarCheck,
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const [showBeams, setShowBeams] = useState(false);
  
  useEffect(() => {
    // Só mostrar beams em desktop e sem preferência de motion reduzido
    setShowBeams(window.innerWidth >= 768 && !prefersReducedMotion);
  }, [prefersReducedMotion]);
  
  // Refs para os círculos dos steps
  const containerRef = useRef<HTMLDivElement>(null);
  const step1Ref = useRef<HTMLDivElement>(null);
  const step2Ref = useRef<HTMLDivElement>(null);
  const step3Ref = useRef<HTMLDivElement>(null);
  
  const stepRefs = [step1Ref, step2Ref, step3Ref];

  return (
    <section
      ref={ref}
      id="como-funciona"
      className="relative py-24 px-4"
    >
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Sem mistério, sem surpresa. Você sabe exatamente o que está acontecendo em cada etapa.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mt-16 grid gap-8 md:grid-cols-3">
          {/* Animated Beams conectando os steps - apenas desktop */}
          {showBeams && (
            <>
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={step1Ref}
                toRef={step2Ref}
                pathColor="rgba(16, 185, 129, 0.2)"
                pathWidth={2}
                gradientStartColor="#10b981"
                gradientStopColor="#059669"
                curvature={-50}
                duration={3}
                delay={0}
              />
              <AnimatedBeam
                containerRef={containerRef}
                fromRef={step2Ref}
                toRef={step3Ref}
                pathColor="rgba(16, 185, 129, 0.2)"
                pathWidth={2}
                gradientStartColor="#10b981"
                gradientStopColor="#059669"
                curvature={-50}
                duration={3}
                delay={1.5}
              />
            </>
          )}

          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.2 + index * 0.15,
                  duration: 0.6,
                  ease: "easeOut",
                }}
                className="relative"
              >
                <div className="relative flex flex-col items-center text-center">
                  {/* Círculo com ícone */}
                  <div 
                    ref={stepRefs[index]}
                    className="relative z-10 flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary/30 bg-background shadow-lg shadow-primary/10"
                  >
                    <Icon className="h-10 w-10 text-primary" />
                  </div>

                  {/* Número */}
                  <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {step.number}
                  </span>

                  {/* Conteúdo */}
                  <h3 className="mt-6 text-xl font-bold text-foreground">
                    {step.title}
                  </h3>
                  <span className="text-sm text-primary font-medium mt-1">
                    {step.subtitle}
                  </span>
                  <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mesa de Controle highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
          className="mt-16 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/20 text-primary">
              <IconSparkles className="h-7 w-7" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="font-bold text-foreground text-lg mb-1">
                Mesa de Controle: o momento de verdade
              </h4>
              <p className="text-muted-foreground">
                Todo mês, sentamos juntos. Você vê exatamente o que foi feito, quais decisões foram tomadas, 
                onde avançamos e onde travamos. Se algo não fez sentido, discutimos ali. 
                <span className="text-foreground font-medium"> É assim que parceria funciona de verdade.</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

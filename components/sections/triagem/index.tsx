"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { IconSparkles, IconClock, IconMapPin, IconChevronRight } from "@tabler/icons-react";
import { Highlighter } from "@vert/components/ui/magic/highlighter";

export function TriagemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();
  const showAnim = !prefersReducedMotion;

  return (
    <section
      ref={ref}
      id="triagem"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Removido o background glow/gradient */}

      <div className="mx-auto max-w-5xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={showAnim ? { opacity: 0, scale: 0.8 } : {}}
            animate={isInView && showAnim ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <IconSparkles className="h-4 w-4" />
            Triagem gratuita, presencial e personalizada.
          </motion.div>
          <motion.h2
            initial={showAnim ? { opacity: 0, y: 30, filter: "blur(10px)" } : {}}
            animate={isInView && showAnim ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Antes de qualquer proposta,<br className="hidden sm:inline" />
            <span className="inline-block mt-2">
              <Highlighter
                action="highlight"
                color="var(--primary)"
                strokeWidth={2}
                animationDuration={900}
                iterations={2}
                padding={4}
                isView={true}
              >
                a gente vai até você
              </Highlighter>
            </span>
          </motion.h2>
          <motion.p
            initial={showAnim ? { opacity: 0, y: 20, filter: "blur(10px)" } : {}}
            animate={isInView && showAnim ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            A triagem é o nosso jeito de entender de verdade o seu contexto. Nada de diagnóstico genérico: sentamos com você, acompanhamos processos reais e mapeamos juntos o que trava o crescimento da sua empresa.
          </motion.p>
        </div>

        {/* Grid de cards */}
        <motion.div
          initial={showAnim ? { opacity: 0, filter: "blur(10px)" } : {}}
          animate={isInView && showAnim ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="grid gap-6 md:grid-cols-3"
        >
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center">
            <IconClock className="h-7 w-7 text-primary mb-2" />
            <div className="font-semibold text-foreground mb-1">Duração média</div>
            <div className="text-muted-foreground text-sm">4 horas de imersão prática na sua operação</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center">
            <IconMapPin className="h-7 w-7 text-primary mb-2" />
            <div className="font-semibold text-foreground mb-1">Onde acontece</div>
            <div className="text-muted-foreground text-sm">Presencial, na sua empresa, lado a lado com o seu time</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col items-center text-center">
            <IconSparkles className="h-7 w-7 text-primary mb-2" />
            <div className="font-semibold text-foreground mb-1">O que você recebe</div>
            <div className="text-muted-foreground text-sm">Proposta detalhada em até 3 dias úteis, com tudo que importa  sem solução pronta, sem software, só clareza</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

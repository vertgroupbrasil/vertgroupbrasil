"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { InfiniteMovingCards } from "@aceternity/infinite-moving-cards";
import { useEffect, useState } from "react";

const PRINCIPLES = [
  {
    quote: "Nenhum projeto começa sem triagem. Entendemos o sistema antes de propor qualquer coisa.",
    name: "Triagem primeiro",
    title: "Princípio #1",
  },
  {
    quote: "Entramos na operação de verdade. Sentamos com líderes, acompanhamos processos reais, entendemos como funciona no dia a dia.",
    name: "Presença real",
    title: "Princípio #2",
  },
  {
    quote: "Todo mês, na Mesa de Controle, você vê exatamente o que foi feito. Nada é escondido, nada é empurrado.",
    name: "Transparência total",
    title: "Princípio #3",
  },
  {
    quote: "Software só existe quando sustenta a operação. Não vendemos tecnologia por vender  desenvolvemos quando resolve.",
    name: "Tecnologia com propósito",
    title: "Princípio #4",
  },
  {
    quote: "Não existe pacote fechado. Cada empresa é única, e propomos exatamente o que faz sentido pro seu contexto.",
    name: "Sob medida",
    title: "Princípio #5",
  },
  {
    quote: "Nosso sucesso depende do seu. Por isso construímos junto, com pele em jogo, até o resultado aparecer.",
    name: "Parceria de verdade",
    title: "Princípio #6",
  },
];

export function PrinciplesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showAnimation, setShowAnimation] = useState(true);

  // Detect mobile and reduced motion
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShowAnimation(!isMobile && !prefersReducedMotion);
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Princípios operacionais
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            As regras que guiam cada projeto da Vert
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
        transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
        className="mt-12"
      >
        {showAnimation ? (
          <InfiniteMovingCards
            items={PRINCIPLES}
            direction="right"
            speed="slow"
            pauseOnHover={true}
            className="py-4"
          />
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-4">
            {PRINCIPLES.map((item, idx) => (
              <div key={idx} className="rounded-2xl border bg-card p-6">
                <div className="text-lg font-semibold mb-2">{item.name}</div>
                <div className="text-muted-foreground mb-2">{item.quote}</div>
                <div className="text-xs text-muted-foreground">{item.title}</div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}

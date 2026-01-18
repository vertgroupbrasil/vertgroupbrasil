"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Marquee } from "../../ui/magic/marquee";
import { Highlighter } from "@vert/components/ui/magic/highlighter";
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
    quote: "Software só existe quando sustenta a operação. Não vendemos tecnologia por vender — desenvolvemos quando resolve.",
    name: "Tecnologia com propósito",
    title: "Princípio #4",
  },
  {
    quote: "Não existe pacote fechado. Cada empresa é única, e propomos exatamente o que faz sentido pro seu contexto.",
    name: "Sob medida",
    title: "Princípio #5",
  },
  {
    quote: "Nosso sucesso depende do seu. Por isso construímos juntos, com pele em jogo, até o resultado aparecer.",
    name: "Parceria de verdade",
    title: "Princípio #6",
  },
];

export default function PrinciplesSection() {
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
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-100% - var(--gap, 1rem))); }
        }
        
        @keyframes marquee-vertical {
          from { transform: translateY(0); }
          to { transform: translateY(calc(-100% - var(--gap, 1rem))); }
        }
        
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        
        .animate-marquee-vertical {
          animation: marquee-vertical 40s linear infinite;
        }
      `}</style>

      <section
      id="principios"
        ref={ref}
        className="relative py-24 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              O que faz a Vert{' '}
              <Highlighter action="box" color="var(--primary)" strokeWidth={2} animationDuration={900} iterations={2} padding={4} isView={true}>
                diferente
              </Highlighter>
            </h2>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
          className="mt-12"
        >
          {showAnimation ? (
            <Marquee 
              className="py-4" 
              pauseOnHover
              repeat={2}
            >
              {PRINCIPLES.map((item, idx) => (
                <div
                  key={idx}
                  className="mx-4 rounded-2xl border bg-card p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-[400px] max-w-[400px]"
                >
                  <div className="text-sm font-semibold text-primary/60 mb-2">
                    {item.title}
                  </div>
                  <div className="text-lg font-bold mb-3 text-foreground">
                    {item.name}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.quote}
                  </div>
                </div>
              ))}
            </Marquee>
          ) : (
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
              {PRINCIPLES.map((item, idx) => (
                <div key={idx} className="rounded-2xl border bg-card p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="text-sm font-semibold text-primary/60 mb-2">
                    {item.title}
                  </div>
                  <div className="text-lg font-bold mb-3">
                    {item.name}
                  </div>
                  <div className="text-sm text-muted-foreground leading-relaxed">
                    {item.quote}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </>
  );
}
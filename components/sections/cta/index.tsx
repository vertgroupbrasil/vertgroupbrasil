"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { HoverBorderGradient } from "@vert/components/ui/aceternity/hover-border-gradient";

export function CTASection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="cta"
      className="relative py-32 px-4 overflow-visible"
    >
      {/* Glow de fundo sutil */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-visible">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Cansou de crescer no improviso?
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Vamos conversar. Sem compromisso, sem proposta na primeira conversa.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
          className="mt-12 flex justify-center"
        >
          <a
            href="https://ig.me/m/vertgroupbrasil"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HoverBorderGradient
              containerClassName="rounded-full"
              className="cursor-pointer group/btn flex items-center gap-3 bg-primary px-10 py-4 text-lg font-semibold text-primary-foreground"
              duration={0.8}
            >
              Quero organizar minha operação
              <ArrowRight className="size-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </HoverBorderGradient>
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="mt-6 text-muted-foreground"
        >
          15 minutos  entendemos o contexto e mostramos caminhos possíveis
        </motion.p>
      </div>
    </section>
  );
}

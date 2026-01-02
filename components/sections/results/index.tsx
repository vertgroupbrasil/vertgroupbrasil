"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  IconChecks,
  IconChartLine,
  IconTrendingUp,
} from "@tabler/icons-react";
import { FloatingCharts } from "./floating-charts";

const RESULTS = [
  {
    icon: IconChecks,
    text: "Processos claros e organizados",
  },
  {
    icon: IconChartLine,
    text: "Operação mais previsível",
  },
  {
    icon: IconTrendingUp,
    text: "Base real para escalar",
  },
];

export function ResultsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="resultados"
      className="relative py-24 px-4"
    >
      {/* Floating Charts no background */}
      <FloatingCharts />
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            O resultado
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Depois de trabalhar com a Vert:
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {RESULTS.map((result, index) => {
            const Icon = result.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : {}}
                transition={{
                  delay: 0.2 + index * 0.1,
                  duration: 0.5,
                  ease: "easeOut",
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
              >
                {/* Glow de fundo no hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {result.text}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

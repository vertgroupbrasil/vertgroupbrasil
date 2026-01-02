"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { cn } from "@vert/lib/utils";

const SECTIONS = [
  { id: "hero", label: "Início" },
  { id: "problema", label: "Problema" },
  { id: "solucao", label: "Solução" },
  { id: "como-funciona", label: "Processo" },
  { id: "solucoes", label: "Método" },
  { id: "parceria", label: "Parceria" },
  { id: "resultados", label: "Resultados" },
  { id: "cta", label: "Contato" },
  { id: "faq", label: "FAQ" },
];

export function SectionProgress() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      // Mostra o indicador após scroll inicial
      setIsVisible(window.scrollY > 200);

      // Encontra a seção ativa
      const sections = SECTIONS.map(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return { id, top: Infinity };
        const rect = element.getBoundingClientRect();
        return { id, top: Math.abs(rect.top - 150) };
      });

      const closest = sections.reduce((prev, curr) =>
        prev.top < curr.top ? prev : curr
      );
      setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, x: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        x: isVisible ? 0 : -20 
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
      aria-label="Progresso da página"
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Linha de fundo */}
        <div className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-border/30" />
        
        {/* Linha de progresso animada */}
        <motion.div
          style={{ scaleY, transformOrigin: "top" }}
          className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-primary to-primary/30"
        />

        {/* Pontos das seções */}
        {SECTIONS.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="group relative z-10 flex items-center"
              aria-label={`Ir para ${label}`}
            >
              {/* Ponto */}
              <motion.div
                animate={{
                  scale: isActive ? 1.3 : 1,
                  backgroundColor: isActive 
                    ? "hsl(var(--primary))" 
                    : "hsl(var(--muted))",
                }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "h-2.5 w-2.5 rounded-full border-2 transition-colors",
                  isActive 
                    ? "border-primary bg-primary shadow-sm shadow-primary/50" 
                    : "border-border bg-background hover:border-primary/50"
                )}
              />
              
              {/* Label no hover */}
              <span className="absolute left-6 whitespace-nowrap rounded-md bg-popover/95 px-2.5 py-1 text-xs font-medium text-popover-foreground opacity-0 shadow-lg backdrop-blur-sm transition-opacity group-hover:opacity-100">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </motion.nav>
  );
}

"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * HeroGlow - Efeito de glow animado atrás do conteúdo principal
 * Otimizado: Em mobile usa CSS puro ao invés de animação
 */
export function HeroGlow() {
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  // Mobile: CSS simples sem animações
  if (isMobile) {
    return (
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="absolute h-[400px] w-[400px] rounded-full bg-primary/20 blur-[100px]" />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      {/* Glow principal verde */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: "blur(0px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(120px)" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute h-[500px] w-[500px] rounded-full bg-primary/30 dark:bg-primary/20"
      />
      
      {/* Glow secundário */}
      <motion.div
        initial={{ opacity: 0, filter: "blur(0px)" }}
        animate={{ opacity: 0.6, filter: "blur(100px)" }}
        transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
        className="absolute h-[300px] w-[600px] -translate-y-20 rounded-full bg-primary/20 dark:bg-primary/10"
      />
    </div>
  );
}

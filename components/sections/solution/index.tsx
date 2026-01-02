"use client";

import { motion, useInView, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState } from "react";
import { IconMap2, IconRocket, IconArrowRight } from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";
import { BackgroundBeams } from "@aceternity/background-beams";

interface SolutionCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  gradient: string;
  glowColor: string;
  delay: number;
  isInView: boolean;
}

function SolutionCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  glowColor,
  delay,
  isInView 
}: SolutionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative flex-1 min-w-[320px] cursor-pointer perspective-1000"
    >
      {/* Glow effect */}
      <motion.div
        className={cn(
          "absolute -inset-px rounded-3xl opacity-0 blur-xl transition-opacity duration-500",
          glowColor
        )}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
      />
      
      {/* Card */}
      <div className={cn(
        "relative h-full overflow-hidden rounded-3xl border border-border/50",
        "bg-gradient-to-br from-card via-card/95 to-card/90",
        "backdrop-blur-xl transition-all duration-500",
        isHovered && "border-primary/30"
      )}>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-20",
            gradient
          )} />
          <svg className="absolute inset-0 h-full w-full opacity-[0.03]">
            <defs>
              <pattern id={`grid-${title}`} width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${title})`} />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col p-8 md:p-10">
          {/* Icon container */}
          <motion.div
            className={cn(
              "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl",
              "bg-gradient-to-br shadow-lg",
              gradient
            )}
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              rotate: isHovered ? 5 : 0 
            }}
            transition={{ duration: 0.3 }}
          >
            <Icon className="h-8 w-8 text-white" strokeWidth={1.5} />
          </motion.div>

          {/* Title */}
          <h3 className="mb-4 text-xl font-bold text-foreground md:text-2xl">
            {title}
          </h3>

          {/* Description */}
          <p className="flex-1 text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>

          {/* Hover indicator */}
          <motion.div
            className="mt-6 flex items-center gap-2 text-sm font-medium text-primary"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
            transition={{ duration: 0.2 }}
          >
            Saiba mais
            <IconArrowRight className="h-4 w-4" />
          </motion.div>
        </div>

        {/* Animated border gradient on hover */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(90deg, transparent, ${isHovered ? 'rgba(16, 185, 129, 0.3)' : 'transparent'}, transparent)`,
            backgroundSize: "200% 100%",
            backgroundRepeat: "no-repeat",
          }}
          animate={{
            backgroundPosition: isHovered ? ["200% 0%", "-200% 0%"] : "200% 0%"
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </motion.div>
  );
}

const SOLUTIONS = [
  {
    icon: IconMap2,
    title: "Guiar processos",
    description: "Mapeamos e organizamos a operação para reduzir improviso e retrabalho, e deixar a empresa mais previsível e pronta para crescer.",
    gradient: "from-emerald-500 to-teal-600",
    glowColor: "bg-emerald-500/50",
  },
  {
    icon: IconRocket,
    title: "Construir negócios",
    description: "Quando existe uma dor recorrente com potencial, estruturamos e colocamos de pé uma solução que pode virar produto escalável, solução reutilizável ou nova linha de receita.",
    gradient: "from-violet-500 to-purple-600",
    glowColor: "bg-violet-500/50",
  },
] as const;

export function SolutionSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="solucao"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background beams */}
      <div className="absolute inset-0 -z-10">
        <BackgroundBeams className="opacity-30" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Existimos para que isso{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  deixe de acontecer
                </span>
                <motion.span
                  className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-emerald-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={isInView ? { width: "100%" } : {}}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                />
              </span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto"
          >
            Vert trabalha em duas frentes — você pode precisar de uma ou das duas:
          </motion.p>
        </div>

        {/* Cards */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {SOLUTIONS.map((solution, index) => (
            <SolutionCard
              key={solution.title}
              {...solution}
              delay={0.3 + index * 0.15}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

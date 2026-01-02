"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { 
  IconAlertTriangle,
  IconMoodConfuzed,
  IconRepeat,
  IconEyeOff,
  IconX,
  IconClockPause,
  IconChartArrowsVertical,
  IconBug,
} from "@tabler/icons-react";
import { PointerHighlight } from "@aceternity/pointer-highlight";

const PROBLEMS = [
  {
    icon: IconAlertTriangle,
    text: "processos estão soltos",
  },
  {
    icon: IconMoodConfuzed,
    text: "decisões são feitas no improviso",
  },
  {
    icon: IconRepeat,
    text: "retrabalho e erros se repetem",
  },
  {
    icon: IconEyeOff,
    text: "oportunidades passam despercebidas",
  },
];

function FloatingNegativeIcons() {
  return (
    <>
      {/* X flutuante esquerda superior */}
      <motion.div
        className="absolute left-[8%] top-[15%] hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, -8, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 text-destructive/60 border border-destructive/20"
        >
          <IconX className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Relógio pausado direita superior */}
      <motion.div
        className="absolute right-[10%] top-[20%] hidden lg:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-destructive/10 text-destructive/50 border border-destructive/20"
        >
          <IconClockPause className="h-6 w-6" />
        </motion.div>
      </motion.div>

      {/* Gráfico caótico esquerda inferior */}
      <motion.div
        className="absolute left-[5%] bottom-[25%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive/50 border border-destructive/20"
        >
          <IconChartArrowsVertical className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Bug direita inferior */}
      <motion.div
        className="absolute right-[8%] bottom-[20%] hidden xl:block"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive/60 border border-destructive/20"
        >
          <IconBug className="h-4 w-4" />
        </motion.div>
      </motion.div>

      {/* Círculos decorativos vermelhos */}
      <motion.div
        className="absolute left-[15%] top-[50%] hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="h-2 w-2 rounded-full bg-destructive/40"
        />
      </motion.div>

      <motion.div
        className="absolute right-[20%] bottom-[40%] hidden lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="h-3 w-3 rounded-full bg-destructive/30"
        />
      </motion.div>
    </>
  );
}

export function ProblemSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section 
      ref={ref}
      id="problema"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Floating icons negativos */}
      <FloatingNegativeIcons />

      <div className="mx-auto max-w-4xl relative">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Seu negócio pode crescer ainda mais
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            — mas hoje:
          </p>
        </motion.div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20, filter: "blur(10px)" }}
                animate={isInView ? { opacity: 1, x: 0, filter: "blur(0px)" } : {}}
                transition={{ 
                  delay: 0.2 + index * 0.1, 
                  duration: 0.5, 
                  ease: "easeOut" 
                }}
                className="group flex items-center gap-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-5 transition-colors hover:border-destructive/40 hover:bg-destructive/10"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-lg font-medium text-foreground">
                  {problem.text}
                </span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
          className="mt-10 flex justify-center"
        >
          <PointerHighlight
            rectangleClassName="border-destructive/50"
            pointerClassName="text-destructive"
          >
            <p className="text-center text-lg text-muted-foreground px-4 py-2">
              Isso custa{" "}
              <span className="font-semibold text-destructive">tempo</span>,{" "}
              <span className="font-semibold text-destructive">dinheiro</span> e{" "}
              <span className="font-semibold text-destructive">energia</span>.
            </p>
          </PointerHighlight>
        </motion.div>
      </div>
    </section>
  );
}

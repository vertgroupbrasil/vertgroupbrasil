"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { IconPlus, IconMinus, IconQuestionMark } from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";
import { SparklesCore } from "@aceternity/sparkles";

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  isInView: boolean;
}

function FAQItem({ question, answer, index, isOpen, onToggle, isInView }: FAQItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
      className="group"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border transition-all duration-500",
          isOpen 
            ? "border-primary/30 bg-gradient-to-br from-primary/5 via-background to-background shadow-lg shadow-primary/5" 
            : "border-border/50 bg-card/50 hover:border-primary/20 hover:bg-card/80"
        )}
      >
        {/* Question button */}
        <button
          onClick={onToggle}
          className="flex w-full items-center gap-4 p-6 text-left transition-colors"
        >
          {/* Number indicator */}
          <div className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold transition-all duration-300",
            isOpen
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
          )}>
            {String(index + 1).padStart(2, '0')}
          </div>

          {/* Question text */}
          <span className={cn(
            "flex-1 text-lg font-semibold transition-colors",
            isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
          )}>
            {question}
          </span>

          {/* Toggle icon */}
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
              isOpen
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
            )}
          >
            {isOpen ? (
              <IconMinus className="h-4 w-4" />
            ) : (
              <IconPlus className="h-4 w-4" />
            )}
          </motion.div>
        </button>

        {/* Answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="px-6 pb-6">
                <div className="ml-14 border-l-2 border-primary/30 pl-6">
                  <p className="text-base leading-relaxed text-muted-foreground">
                    {answer}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

const FAQ_ITEMS = [
  {
    question: "\"Já fiz consultoria antes e não mudou nada.\"",
    answer: "Consultoria tradicional entrega um PowerPoint bonito, propõe um monte de coisa pra você fazer e some. A Vert é diferente: a gente constrói. Desenvolvemos soluções reais com tecnologia, implementamos junto e só saímos quando está rodando de verdade.",
  },
  {
    question: "\"Isso é só mais uma consultoria?\"",
    answer: "Não. É diagnóstico + execução + acompanhamento; e, quando existe oportunidade escalável, co-construção da solução. A gente coloca a mão na massa.",
  },
  {
    question: "\"Minha empresa é muito bagunçada, não tem jeito.\"",
    answer: "Quanto mais caos, mais impacto a organização gera. Já vimos empresas saírem do improviso total para operações previsíveis em semanas. O primeiro passo é ter clareza — e isso a gente resolve rápido.",
  },
  {
    question: "\"Vai virar um monte de documento que ninguém lê?\"",
    answer: "Zero. Mapeamento existe para dar visão e destravar implementação, não para encher gaveta. Se não for prático, não fazemos.",
  },
  {
    question: "\"Quanto tempo leva para ver resultados?\"",
    answer: "Depende do contexto, mas geralmente em 2-4 semanas já existe clareza sobre os gargalos e um plano de ação rodando. Resultados concretos aparecem entre 1-3 meses.",
  },
  {
    question: "\"Vocês desenvolvem software?\"",
    answer: "Sim, quando faz sentido. Se identificamos uma dor recorrente com potencial, construímos soluções sob medida que podem virar produto escalável ou ferramenta interna.",
  },
  {
    question: "\"Como funciona o modelo de parceria?\"",
    answer: "Se você tem uma ideia ou identificou uma dor no mercado que pode virar produto, a gente desenvolve junto. Construímos a solução, você comercializa, e a Vert entra com participação no resultado. Nosso sucesso depende do seu — então estamos 100% comprometidos em fazer dar certo.",
  },
  {
    question: "\"Por que a Vert se existem empresas maiores no mercado?\"",
    answer: "Empresas grandes te tratam como mais um ticket. A Vert é um grupo enxuto que cresce junto com você — conhecemos seu negócio de verdade, temos pele em jogo e não descansamos até o resultado aparecer. Aqui você não é cliente, é parceiro.",
  },
] as const;

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      ref={ref}
      id="faq"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Sparkles background */}
      <div className="absolute inset-0 -z-10">
        <SparklesCore
          id="faq-sparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1}
          particleDensity={30}
          particleColor="#10b981"
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background" />
      </div>

      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-emerald-600 shadow-lg shadow-primary/30"
          >
            <IconQuestionMark className="h-8 w-8 text-white" strokeWidth={2.5} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl"
          >
            Perguntas Frequentes
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="mt-4 text-lg text-muted-foreground"
          >
            Dúvidas que sempre aparecem
          </motion.p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-muted-foreground">
            Ainda tem dúvidas?{" "}
            <a
              href="#cta"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Vamos conversar
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

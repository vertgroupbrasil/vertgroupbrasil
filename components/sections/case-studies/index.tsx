"use client";

import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import Image from "next/image";
import {
  IconQuote,
  IconArrowRight,
  IconArrowLeft,
  IconTrendingUp,
  IconUsers,
  IconClock,
  IconChartBar,
  IconSparkles,
  IconBuildingStore,
} from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";

// ====================================
// DADOS DOS CASES - EDITE AQUI
// ====================================
// Para adicionar um novo case, basta copiar o objeto abaixo e preencher os dados
// As imagens devem ser colocadas em /public/cases/[nome-do-case]/
const CASE_STUDIES = [
  {
    id: "empresa-exemplo",
    // Informações básicas
    company: "Salgados Familiares",
    industry: "Produção e distribuição de alimentos",
    logo: "/cases/exemplo/logo.svg", // Troque pela logo real
    
    // Descrição curta do case
    headline: "Do caos operacional à sintropia",
    description:
      "Para entender de verdade a operação da Salgados Familiares, a gente foi pra cozinha. Literalmente. Colocamos a mão na massa — fizemos bolinho de carne, acompanhamos pedidos, sentimos na pele os gargalos. Só assim conseguimos redesenhar os processos e construir um sistema de gestão que faz sentido pro dia a dia deles. Hoje, produção e vendas conversam em tempo real, e a equipe finalmente tem clareza pra focar no que importa: crescer.",
    
    // Métricas de resultado (adicione ou remova conforme necessário)
    metrics: [
      { label: "Redução de tempo", value: "65%", icon: IconClock },
      { label: "Aumento de vendas", value: "2.3x", icon: IconTrendingUp },
      { label: "Erros eliminados", value: "90%", icon: IconChartBar },
      { label: "Horas economizadas/mês", value: "+120h", icon: IconUsers },
    ],
    
    // Depoimento do cliente
    testimonial: {
      quote:
        "A Vert não ficou só na teoria. Eles vieram pra cá, entenderam nossa rotina, sentiram nossas dificuldades. O sistema que construíram é exatamente o que a gente precisava — simples, prático e feito pra nossa realidade.",
      author: "João Silva",
      role: "CEO, Empresa Exemplo",
      avatar: "/cases/exemplo/avatar.jpg", // Troque pelo avatar real
    },
    
    // Screenshots do sistema (adicione quantas quiser)
    // Recomendação: 3-4 imagens funcionam bem
    screenshots: [
      {
        src: "/placeholder-dashboard.svg", // Troque pela imagem real
        alt: "Dashboard principal do sistema",
        caption: "Visão geral do dashboard",
      },
      {
        src: "/placeholder-analytics.svg", // Troque pela imagem real
        alt: "Tela de análise de dados",
        caption: "Analytics em tempo real",
      },
      {
        src: "/placeholder-orders.svg", // Troque pela imagem real
        alt: "Gestão de pedidos",
        caption: "Gestão de pedidos simplificada",
      },
    ],
    
    // Tags para destacar tecnologias ou abordagens usadas
    tags: ["Automação", "Dashboard", "Integração API", "Next.js"],
  },
  // ====================================
  // ADICIONE MAIS CASES AQUI
  // ====================================
  // {
  //   id: "outro-case",
  //   company: "Outra Empresa",
  //   industry: "Setor",
  //   ...
  // },
];

// Componente de placeholder para imagens que ainda não existem
function ImagePlaceholder({ 
  className, 
  label 
}: { 
  className?: string; 
  label?: string;
}) {
  return (
    <div 
      className={cn(
        "flex flex-col items-center justify-center bg-gradient-to-br from-muted/50 to-muted rounded-xl border border-dashed border-border",
        className
      )}
    >
      <IconBuildingStore className="h-12 w-12 text-muted-foreground/40" />
      {label && (
        <span className="mt-2 text-xs text-muted-foreground/60">{label}</span>
      )}
    </div>
  );
}

// Componente de Screenshot com suporte a placeholder
function Screenshot({ 
  src, 
  alt, 
  caption,
  isActive,
  onClick,
}: { 
  src: string; 
  alt: string; 
  caption?: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const [hasError, setHasError] = useState(false);
  const isPlaceholder = src.includes("placeholder") || hasError;

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border transition-all duration-300",
        isActive 
          ? "border-primary shadow-lg shadow-primary/10 ring-2 ring-primary/20" 
          : "border-border hover:border-primary/50"
      )}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {isPlaceholder ? (
        <ImagePlaceholder className="aspect-video w-full" label={caption} />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={400}
          height={225}
          className="aspect-video w-full object-cover"
          onError={() => setHasError(true)}
        />
      )}
      {caption && !isPlaceholder && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
          <span className="text-xs text-white/90">{caption}</span>
        </div>
      )}
    </motion.div>
  );
}

// Card de case individual
function CaseCard({ 
  caseStudy, 
  index 
}: { 
  caseStudy: typeof CASE_STUDIES[0]; 
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [activeScreenshot, setActiveScreenshot] = useState(0);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: "easeOut" }}
      className="relative"
    >
      {/* Card principal */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-card to-card/80 p-8 md:p-10">
        {/* Glow decorativo */}
        <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

        <div className="relative">
          {/* Header do case */}
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div className="flex items-center gap-4">
              {/* Logo placeholder */}
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                <IconBuildingStore className="h-7 w-7 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">
                  {caseStudy.company}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {caseStudy.industry}
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Headline e descrição */}
          <div className="mb-8">
            <h4 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
              {caseStudy.headline}
            </h4>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {caseStudy.description}
            </p>
          </div>

          {/* Grid de conteúdo: Screenshots + Métricas */}
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Screenshots */}
            <div className="lg:col-span-3 space-y-4">
              {/* Screenshot principal */}
              <div className="relative overflow-hidden rounded-2xl border border-border bg-muted/30">
                {caseStudy.screenshots[activeScreenshot]?.src.includes("placeholder") ? (
                  <ImagePlaceholder 
                    className="aspect-video w-full min-h-[280px]" 
                    label="Screenshot do sistema" 
                  />
                ) : (
                  <Image
                    src={caseStudy.screenshots[activeScreenshot]?.src || ""}
                    alt={caseStudy.screenshots[activeScreenshot]?.alt || ""}
                    width={800}
                    height={450}
                    className="aspect-video w-full object-cover"
                  />
                )}
                
                {/* Navegação de screenshots */}
                {caseStudy.screenshots.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
                    <button
                      onClick={() => setActiveScreenshot((prev) => 
                        prev === 0 ? caseStudy.screenshots.length - 1 : prev - 1
                      )}
                      className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <IconArrowLeft className="h-4 w-4 text-white" />
                    </button>
                    <span className="text-xs text-white/80 min-w-[3rem] text-center">
                      {activeScreenshot + 1} / {caseStudy.screenshots.length}
                    </span>
                    <button
                      onClick={() => setActiveScreenshot((prev) => 
                        prev === caseStudy.screenshots.length - 1 ? 0 : prev + 1
                      )}
                      className="p-1 rounded-full hover:bg-white/20 transition-colors"
                    >
                      <IconArrowRight className="h-4 w-4 text-white" />
                    </button>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-3 gap-3">
                {caseStudy.screenshots.map((screenshot, idx) => (
                  <Screenshot
                    key={idx}
                    src={screenshot.src}
                    alt={screenshot.alt}
                    caption={screenshot.caption}
                    isActive={idx === activeScreenshot}
                    onClick={() => setActiveScreenshot(idx)}
                  />
                ))}
              </div>
            </div>

            {/* Métricas e Depoimento */}
            <div className="lg:col-span-2 space-y-6">
              {/* Métricas */}
              <div className="grid grid-cols-2 gap-3">
                {caseStudy.metrics.map((metric, idx) => {
                  const Icon = metric.icon;
                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.4 + idx * 0.1, duration: 0.4 }}
                      className="relative overflow-hidden rounded-xl border border-border bg-card p-4 text-center"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
                      <div className="relative">
                        <Icon className="mx-auto h-5 w-5 text-primary mb-2" />
                        <div className="text-2xl font-bold text-foreground">
                          {metric.value}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {metric.label}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Depoimento */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="relative overflow-hidden rounded-xl border border-primary/20 bg-primary/5 p-5"
              >
                <IconQuote className="absolute -top-2 -left-2 h-12 w-12 text-primary/10" />
                <div className="relative">
                  <p className="text-sm text-foreground/90 italic leading-relaxed">
                    "{caseStudy.testimonial.quote}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <IconUsers className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {caseStudy.testimonial.author}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {caseStudy.testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Componente principal da seção
export function CaseStudiesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCase, setActiveCase] = useState(0);

  const nextCase = () => {
    setActiveCase((prev) => (prev + 1) % CASE_STUDIES.length);
  };

  const prevCase = () => {
    setActiveCase((prev) => (prev - 1 + CASE_STUDIES.length) % CASE_STUDIES.length);
  };

  return (
    <section
      ref={ref}
      id="cases"
      className="relative py-24 px-4 overflow-hidden"
    >
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        {/* Header da seção */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6"
          >
            <IconSparkles className="h-4 w-4" />
            Cases de Sucesso
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Resultados que{" "}
              <span className="text-primary">falam por si</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-6 text-lg text-muted-foreground md:text-xl max-w-2xl mx-auto"
          >
            Veja como ajudamos empresas reais a transformar suas operações e 
            construir soluções que geram impacto.
          </motion.p>
        </div>

        {/* Carrossel de cases */}
        <div className="relative overflow-hidden">
          <motion.div
            key={activeCase}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <CaseCard caseStudy={CASE_STUDIES[activeCase]} index={0} />
          </motion.div>
        </div>

        {/* Navegação entre cases (só aparece se tiver mais de 1) */}
        {CASE_STUDIES.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 mt-8"
          >
            <button
              onClick={prevCase}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all"
              aria-label="Case anterior"
            >
              <IconArrowLeft className="h-5 w-5 text-foreground" />
            </button>

            {/* Indicadores de página */}
            <div className="flex items-center gap-2">
              {CASE_STUDIES.map((caseStudy, idx) => (
                <button
                  key={caseStudy.id}
                  onClick={() => setActiveCase(idx)}
                  className={cn(
                    "transition-all duration-300",
                    idx === activeCase
                      ? "h-2.5 w-8 rounded-full bg-primary"
                      : "h-2.5 w-2.5 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  )}
                  aria-label={`Ir para ${caseStudy.company}`}
                />
              ))}
            </div>

            <button
              onClick={nextCase}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card hover:bg-muted hover:border-primary/50 transition-all"
              aria-label="Próximo case"
            >
              <IconArrowRight className="h-5 w-5 text-foreground" />
            </button>
          </motion.div>
        )}

        {/* Contador de cases */}
        {CASE_STUDIES.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-4"
          >
            <span className="text-sm text-muted-foreground">
              {activeCase + 1} de {CASE_STUDIES.length} cases
            </span>
          </motion.div>
        )}

        {/* CTA para mais cases */}
        {CASE_STUDIES.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground">
              Quer ver sua empresa aqui?{" "}
              <a 
                href="https://ig.me/m/vertgroupbrasil" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium inline-flex items-center gap-1"
              >
                Vamos conversar
                <IconArrowRight className="h-4 w-4" />
              </a>
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}

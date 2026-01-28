"use client";

import { useState } from "react";

const BLOCKS = [
  {
    title: "Impacto Real do Gargalo",
    question: "Como esse processo impacta o negócio?",
    options: [
      "Impacto local (1 área, sem afetar receita)",
      "Impacto operacional (custo, prazo ou retrabalho)",
      "Impacto financeiro direto (receita, margem ou caixa)",
      "Impacto sistêmico (financeiro + operação + cliente)",
    ],
  },
  {
    title: "Alcance no Sistema",
    question: "Quantas partes do sistema esse processo afeta?",
    options: [
      "Uma área, fluxo simples",
      "Duas áreas ou um sistema central",
      "Múltiplas áreas com dependências",
      "Várias áreas + sistemas + exceções",
    ],
  },
  {
    title: "Estado Atual do Processo",
    question: "Como esse processo funciona hoje?",
    options: [
      "Funciona, mas é manual",
      "Funciona com retrabalho frequente",
      "Funciona de forma instável",
      "Não funciona de forma previsível",
    ],
  },
  {
    title: "Risco Assumido pela Vert",
    question: "O que acontece se a solução falhar?",
    options: [
      "Baixo impacto, fácil correção",
      "Impacto operacional controlável",
      "Impacto relevante para o negócio",
      "Exposição direta para liderança ou operação crítica",
    ],
  },
  {
    title: "Esforço Tecnológico",
    question: "O que é necessário tecnicamente?",
    options: [
      "Ajuste simples ou configuração",
      "Automação ou script isolado",
      "Integração entre sistemas",
      "Solução técnica estruturante (base para outros processos)",
    ],
  },
];

const PRICE_RANGES = [
  { min: 5, max: 7, label: "Processo operacional simples", range: "R$ 6.000 – R$ 10.000" },
  { min: 8, max: 11, label: "Processo estruturante", range: "R$ 10.000 – R$ 18.000" },
  { min: 12, max: 15, label: "Processo sistêmico", range: "R$ 18.000 – R$ 30.000" },
  { min: 16, max: 20, label: "Processo crítico", range: "R$ 30.000 – R$ 50.000+" },
];

export default function CalculadoraInternaPage() {
  const [answers, setAnswers] = useState<number[]>(Array(BLOCKS.length).fill(0));
  const [totalLevel, setTotalLevel] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [processType, setProcessType] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const handleAnswerChange = (blockIndex: number, value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[blockIndex] = value;
    setAnswers(updatedAnswers);
  };

  const calculatePrice = () => {
    const total = answers.reduce((sum, value) => sum + value, 0);
    setTotalLevel(total);

    const range = PRICE_RANGES.find((r) => total >= r.min && total <= r.max);
    if (range) {
      setPriceRange(range.range);
      setProcessType(range.label);
    }

    const factors = BLOCKS.map((block, index) => {
      const selectedOption = block.options[answers[index] - 1];
      return `${block.title}: ${selectedOption}`;
    }).join(", ");

    setExplanation(`A faixa é maior porque ${factors}.`);
  };

  const resetCalculator = () => {
    setAnswers(Array(BLOCKS.length).fill(0));
    setTotalLevel(null);
    setPriceRange(null);
    setProcessType(null);
    setExplanation(null);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Calculadora Interna de Precificação</h1>
          <p className="text-muted-foreground">
            A Vert não vende horas. Assume responsabilidade sobre processos. Use esta calculadora para entender o nível de responsabilidade sistêmica e a faixa de preço sugerida.
          </p>
        </div>

        {/* Blocks */}
        {BLOCKS.map((block, blockIndex) => (
          <div key={blockIndex} className="mb-8 p-6 rounded-2xl border border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground mb-4">{block.title}</h2>
            <p className="text-sm text-muted-foreground mb-4">{block.question}</p>
            <div className="space-y-2">
              {block.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center">
                  <input
                    type="radio"
                    id={`block-${blockIndex}-option-${optionIndex}`}
                    name={`block-${blockIndex}`}
                    value={optionIndex + 1}
                    checked={answers[blockIndex] === optionIndex + 1}
                    onChange={() => handleAnswerChange(blockIndex, optionIndex + 1)}
                    className="mr-3"
                  />
                  <label htmlFor={`block-${blockIndex}-option-${optionIndex}`} className="text-sm text-foreground">
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Results */}
        {totalLevel !== null && priceRange && processType && explanation && (
          <div className="p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
            <h3 className="text-lg font-semibold text-foreground mb-4">Resultado</h3>
            <p className="text-sm text-muted-foreground mb-2">Nível total de responsabilidade</p>
            <p className="text-4xl font-bold text-primary">{totalLevel}</p>
            <p className="text-sm text-muted-foreground mt-4">Tipo de processo</p>
            <p className="text-2xl font-bold text-foreground">{processType}</p>
            <p className="text-sm text-muted-foreground mt-4">Faixa de preço sugerida</p>
            <p className="text-2xl font-bold text-foreground">{priceRange}</p>
            <p className="text-sm text-muted-foreground mt-4">Fatores considerados</p>
            <p className="text-sm text-foreground">{explanation}</p>
          </div>
        )}

        {/* Calculate and Reset Buttons */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={calculatePrice}
            className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Calcular
          </button>
          <button
            onClick={resetCalculator}
            className="px-6 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Resetar
          </button>
        </div>
      </div>
    </div>
  );
}
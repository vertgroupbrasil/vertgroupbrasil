"use client";

import { useState, useMemo } from "react";
import { IconLock, IconCalculator, IconEdit, IconCheck, IconUsers, IconClock, IconCalendar, IconBuildingSkyscraper, IconReceipt } from "@tabler/icons-react";
import { cn } from "@vert/lib/utils";

// Valores hora base por horizontal
const DEFAULT_BASE_VALUES = {
  core: 70,
  process: 35,
  data: 45,
  brand: 45,
  gtm: 50,
  engine: 35,
};

// Fatores de complexidade por horizontal e nível
const DEFAULT_COMPLEXITY_FACTORS = {
  core: { operacional: 1.0, integrado: 1.2, sistemico: 1.4 },
  process: { operacional: 1.0, integrado: 1.4, sistemico: 2.0 },
  data: { operacional: 1.0, integrado: 1.3, sistemico: 1.6 },
  brand: { operacional: 1.0, integrado: 1.1, sistemico: 1.2 },
  gtm: { operacional: 1.0, integrado: 1.2, sistemico: 1.4 },
  engine: { operacional: 1.0, integrado: 1.0, sistemico: 1.1 },
};

type HorizontalKey = keyof typeof DEFAULT_BASE_VALUES;
type ComplexityLevel = "operacional" | "integrado" | "sistemico";

const HORIZONTAL_LABELS: Record<HorizontalKey, string> = {
  core: "Core",
  process: "Process",
  data: "Data",
  brand: "Brand",
  gtm: "Go-to-Market",
  engine: "Engine",
};

const COMPLEXITY_LABELS: Record<ComplexityLevel, string> = {
  operacional: "Vetor Operacional",
  integrado: "Vetor Integrado",
  sistemico: "Vetor Sistêmico",
};

function PasswordScreen({ onUnlock }: { onUnlock: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "Diferenca@2026") {
      onUnlock();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <IconLock className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Área restrita</h1>
          <p className="mt-2 text-muted-foreground">Digite a senha para acessar</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className={cn(
              "w-full px-4 py-3 rounded-xl border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all",
              error ? "border-destructive ring-2 ring-destructive/50" : "border-border"
            )}
            autoFocus
          />
          {error && (
            <p className="text-sm text-destructive text-center">Senha incorreta</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

function Calculator() {
  const [complexityLevel, setComplexityLevel] = useState<ComplexityLevel>("operacional");
  const [hours, setHours] = useState<Record<HorizontalKey, string>>({
    core: "",
    process: "",
    data: "",
    brand: "",
    gtm: "",
    engine: "",
  });
  const [baseValues, setBaseValues] = useState(DEFAULT_BASE_VALUES);
  const [complexityFactors, setComplexityFactors] = useState(DEFAULT_COMPLEXITY_FACTORS);
  const [editingBase, setEditingBase] = useState<HorizontalKey | null>(null);
  const [editingFactor, setEditingFactor] = useState<{ key: HorizontalKey; level: ComplexityLevel } | null>(null);
  
  // Novos estados para o sumário
  const [teamSize, setTeamSize] = useState("4");
  const [expectedMonthsMin, setExpectedMonthsMin] = useState("");
  const [expectedMonthsMax, setExpectedMonthsMax] = useState("");
  const [globalMultiplier, setGlobalMultiplier] = useState("1");
  const [includeWeekend, setIncludeWeekend] = useState(false);
  const [weekendPercentage, setWeekendPercentage] = useState("");

  const calculations = useMemo(() => {
    const results: Record<HorizontalKey, { hourValue: number; subtotal: number }> = {} as any;
    let total = 0;

    (Object.keys(HORIZONTAL_LABELS) as HorizontalKey[]).forEach((key) => {
      const baseValue = baseValues[key];
      const factor = complexityFactors[key][complexityLevel];
      const hourValue = baseValue * factor * (Number(globalMultiplier) || 1);
      const hourCount = Number(hours[key]) || 0;
      const subtotal = hourValue * hourCount;
      results[key] = { hourValue, subtotal };
      total += subtotal;
    });

    return { results, total };
  }, [hours, baseValues, complexityFactors, complexityLevel, globalMultiplier]);

  const totalHours = useMemo(() => {
    return Object.values(hours).reduce((acc, h) => acc + (Number(h) || 0), 0);
  }, [hours]);

  // Cálculos do sumário do projeto
  const projectSummary = useMemo(() => {
    // Horas por pessoa por mês
    const hoursPerPersonPerMonth = totalHours / Math.max(Number(teamSize) || 1, 1);

    // Cálculo de horas diárias considerando fim de semana
    const workDaysPerMonth = 22; // dias úteis
    const weekendDaysPerMonth = 8; // sábados e domingos (~4 semanas)

    let dailyHoursWeekday: number;
    let dailyHoursWeekend: number;

    if (includeWeekend && Number(weekendPercentage) > 0) {
      const effectiveDays = workDaysPerMonth + (weekendDaysPerMonth * (Number(weekendPercentage) / 100));
      dailyHoursWeekday = hoursPerPersonPerMonth / effectiveDays;
      dailyHoursWeekend = dailyHoursWeekday * (Number(weekendPercentage) / 100);
    } else {
      dailyHoursWeekday = hoursPerPersonPerMonth / workDaysPerMonth;
      dailyHoursWeekend = 0;
    }

    // Horas totais do projeto baseado nos meses
    const minMonths = Number(expectedMonthsMin) || 0;
    const maxMonths = Number(expectedMonthsMax) || 0;
    const totalProjectHoursMin = totalHours * minMonths;
    const totalProjectHoursMax = totalHours * maxMonths;
    const avgTotalProjectHours = (totalProjectHoursMin + totalProjectHoursMax) / 2;

    // Horas de Core por semana (4 semanas por mês)
    const coreHoursPerWeek = (Number(hours.core) || 0) / 4;

    // Visitas presenciais por semana (máximo 4h por visita)
    const maxHoursPerVisit = 4;
    const visitsPerWeek = Math.ceil(coreHoursPerWeek / maxHoursPerVisit);
    const hoursPerVisit = visitsPerWeek > 0 ? coreHoursPerWeek / visitsPerWeek : 0;

    // Receita total do projeto (valor mensal × meses)
    const totalRevenueMin = calculations.total * minMonths;
    const totalRevenueMax = calculations.total * maxMonths;
    const avgTotalRevenue = (totalRevenueMin + totalRevenueMax) / 2;

    return {
      hoursPerPersonPerMonth,
      dailyHoursWeekday,
      dailyHoursWeekend,
      totalProjectHoursMin,
      totalProjectHoursMax,
      avgTotalProjectHours,
      coreHoursPerWeek,
      visitsPerWeek,
      hoursPerVisit,
      totalRevenueMin,
      totalRevenueMax,
      avgTotalRevenue,
    };
  }, [totalHours, teamSize, expectedMonthsMin, expectedMonthsMax, hours.core, calculations.total, includeWeekend, weekendPercentage]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <IconCalculator className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Calculadora Vert</h1>
          </div>
          <p className="text-muted-foreground">
            Calcule o valor mensal do projeto baseado nas horizontais e complexidade.
          </p>
        </div>

        {/* Complexity Select + Global Multiplier */}
        <div className="mb-8 p-6 rounded-2xl border border-border bg-card">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Nível de Complexidade do Sistema
              </label>
              <select
                value={complexityLevel}
                onChange={(e) => setComplexityLevel(e.target.value as ComplexityLevel)}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {(Object.keys(COMPLEXITY_LABELS) as ComplexityLevel[]).map((level) => (
                  <option key={level} value={level}>
                    {COMPLEXITY_LABELS[level]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Multiplicador Global de Valor/Hora
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  step="0.05"
                  min="0.1"
                  value={globalMultiplier}
                  onChange={(e) => setGlobalMultiplier(e.target.value)}
                  placeholder="1"
                  className="flex-1 px-4 py-3 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="flex gap-1">
                  <button
                    onClick={() => setGlobalMultiplier("0.8")}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${globalMultiplier === "0.8" ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                  >
                    -20%
                  </button>
                  <button
                    onClick={() => setGlobalMultiplier("1")}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${globalMultiplier === "1" ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                  >
                    Base
                  </button>
                  <button
                    onClick={() => setGlobalMultiplier("1.2")}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${globalMultiplier === "1.2" ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80 text-muted-foreground'}`}
                  >
                    +20%
                  </button>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Ajuste para simular descontos ou aumentos. Ex: 0.9 = -10%, 1.15 = +15%
              </p>
            </div>
          </div>
        </div>

        {/* Horizontals Table */}
        <div className="mb-8 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">Horizontal</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Valor Base</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Fator</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Valor/Hora</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-foreground">Horas</th>
                  <th className="px-4 py-3 text-right text-sm font-semibold text-foreground">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {(Object.keys(HORIZONTAL_LABELS) as HorizontalKey[]).map((key) => {
                  const factor = complexityFactors[key][complexityLevel];
                  const { hourValue, subtotal } = calculations.results[key];
                  const isEditingBase = editingBase === key;
                  const isEditingFactor = editingFactor?.key === key && editingFactor?.level === complexityLevel;

                  return (
                    <tr key={key} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="px-4 py-4">
                        <span className="font-medium text-foreground">{HORIZONTAL_LABELS[key]}</span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        {isEditingBase ? (
                          <div className="flex items-center justify-center gap-1">
                            <span className="text-muted-foreground">R$</span>
                            <input
                              type="number"
                              value={baseValues[key]}
                              onChange={(e) => setBaseValues({ ...baseValues, [key]: Number(e.target.value) })}
                              className="w-16 px-2 py-1 rounded border border-primary bg-background text-center text-foreground focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => setEditingBase(null)}
                              className="p-1 rounded hover:bg-primary/10 text-primary"
                            >
                              <IconCheck className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingBase(key)}
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            R$ {baseValues[key].toFixed(0)}
                            <IconEdit className="h-3 w-3 opacity-50" />
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        {isEditingFactor ? (
                          <div className="flex items-center justify-center gap-1">
                            <input
                              type="number"
                              step="0.1"
                              value={factor}
                              onChange={(e) => setComplexityFactors({
                                ...complexityFactors,
                                [key]: { ...complexityFactors[key], [complexityLevel]: Number(e.target.value) }
                              })}
                              className="w-16 px-2 py-1 rounded border border-primary bg-background text-center text-foreground focus:outline-none"
                              autoFocus
                            />
                            <button
                              onClick={() => setEditingFactor(null)}
                              className="p-1 rounded hover:bg-primary/10 text-primary"
                            >
                              <IconCheck className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setEditingFactor({ key, level: complexityLevel })}
                            className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
                          >
                            ×{factor.toFixed(1)}
                            <IconEdit className="h-3 w-3 opacity-50" />
                          </button>
                        )}
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="font-medium text-primary">
                          R$ {hourValue.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <input
                          type="number"
                          min="0"
                          value={hours[key]}
                          onChange={(e) => setHours({ ...hours, [key]: e.target.value })}
                          placeholder="0"
                          className="w-20 px-3 py-2 rounded-lg border border-border bg-background text-center text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        />
                      </td>
                      <td className="px-4 py-4 text-right">
                        <span className={cn(
                          "font-semibold",
                          subtotal > 0 ? "text-foreground" : "text-muted-foreground"
                        )}>
                          R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Total */}
        <div className="p-6 rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total de horas</p>
              <p className="text-2xl font-bold text-foreground">{totalHours}h/mês</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Valor mensal do projeto</p>
              <p className="text-4xl font-bold text-primary">
                R$ {calculations.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Sumário do Projeto */}
        {totalHours > 0 && (
          <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-6 flex items-center gap-2">
              <IconCalendar className="h-5 w-5 text-primary" />
              Sumário do Projeto
            </h3>
            
            {/* Inputs de configuração */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {/* Número de pessoas */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <IconUsers className="h-4 w-4 text-primary" />
                  Pessoas no projeto
                </label>
                <input
                  type="number"
                  min="1"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  placeholder="4"
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              
              {/* Range de meses esperados (sem texto de mínimo/máximo) */}
              <div className="p-4 rounded-xl bg-muted/50 border border-border sm:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
                  <IconCalendar className="h-4 w-4 text-primary" />
                  Duração do projeto (meses)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={expectedMonthsMin}
                      onChange={(e) => setExpectedMonthsMin(e.target.value)}
                      placeholder="4"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <span className="text-muted-foreground">até</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={expectedMonthsMax}
                      onChange={(e) => setExpectedMonthsMax(e.target.value)}
                      placeholder="6"
                      className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <span className="text-muted-foreground">meses</span>
                </div>
              </div>
            </div>

            {/* Métricas calculadas */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {/* Horas por pessoa */}
              <div className="p-4 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <IconUsers className="h-4 w-4" />
                  <span className="text-sm">Horas por pessoa/mês</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {projectSummary.hoursPerPersonPerMonth.toFixed(1)}h
                </p>
                
                {/* Checkbox e input para fim de semana */}
                <div className="mt-3 pt-3 border-t border-border">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={includeWeekend}
                      onChange={(e) => setIncludeWeekend(e.target.checked)}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                    />
                    <span className="text-sm text-muted-foreground">Incluir fim de semana</span>
                  </label>
                  
                  {includeWeekend && (
                    <div className="mt-2 flex items-center gap-2">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        step="5"
                        value={weekendPercentage}
                        onChange={(e) => setWeekendPercentage(e.target.value)}
                        placeholder="50"
                        className="w-16 px-2 py-1 text-sm rounded border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      />
                      <span className="text-xs text-muted-foreground">% da hora útil no fds</span>
                    </div>
                  )}
                </div>
                
                {/* Resultado das horas */}
                <div className="mt-3 pt-3 border-t border-border space-y-1">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{projectSummary.dailyHoursWeekday.toFixed(1)}h</span> por dia útil
                  </p>
                  {includeWeekend && Number(weekendPercentage) > 0 && (
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{projectSummary.dailyHoursWeekend.toFixed(1)}h</span> por dia de fds
                    </p>
                  )}
                </div>
              </div>

              {/* Presença na empresa */}
              <div className="p-4 rounded-xl border border-border bg-background">
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <IconBuildingSkyscraper className="h-4 w-4" />
                  <span className="text-sm">Presença na empresa</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {projectSummary.visitsPerWeek}x por semana
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  {projectSummary.hoursPerVisit.toFixed(1)}h por visita
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  (Core: {hours.core}h/mês = {projectSummary.coreHoursPerWeek.toFixed(1)}h/semana)
                </p>
              </div>

              {/* Horas totais do projeto */}
              {(Number(expectedMonthsMin) > 0 || Number(expectedMonthsMax) > 0) && (
                <div className="p-4 rounded-xl border border-border bg-background">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <IconClock className="h-4 w-4" />
                    <span className="text-sm">Horas totais do projeto</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">
                    {projectSummary.totalProjectHoursMin.toFixed(0)} - {projectSummary.totalProjectHoursMax.toFixed(0)}h
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Média: {projectSummary.avgTotalProjectHours.toFixed(0)}h
                  </p>
                </div>
              )}

              {/* Receita total do projeto */}
              {(Number(expectedMonthsMin) > 0 || Number(expectedMonthsMax) > 0) && (
                <div className="p-4 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 sm:col-span-2 lg:col-span-3">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 mb-2">
                    <IconReceipt className="h-4 w-4" />
                    <span className="text-sm font-medium">Receita total estimada do projeto</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
                    <div>
                      <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                        R$ {projectSummary.totalRevenueMin.toLocaleString("pt-BR", { minimumFractionDigits: 2 })} - R$ {projectSummary.totalRevenueMax.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Média: R$ {projectSummary.avgTotalRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ({expectedMonthsMin} - {expectedMonthsMax} meses)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Summary by horizontal */}
        {totalHours > 0 && (
          <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
            <h3 className="font-semibold text-foreground mb-4">Resumo por Horizontal</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {(Object.keys(HORIZONTAL_LABELS) as HorizontalKey[]).map((key) => {
                if ((Number(hours[key]) || 0) === 0) return null;
                const { hourValue, subtotal } = calculations.results[key];
                return (
                  <div key={key} className="p-4 rounded-xl bg-muted/50">
                    <p className="font-medium text-foreground">{HORIZONTAL_LABELS[key]}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {hours[key]}h × R$ {hourValue.toFixed(2)}
                    </p>
                    <p className="text-lg font-semibold text-primary mt-2">
                      R$ {subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Reset button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              setHours({ core: "", process: "", data: "", brand: "", gtm: "", engine: "" });
              setBaseValues(DEFAULT_BASE_VALUES);
              setComplexityFactors(DEFAULT_COMPLEXITY_FACTORS);
              setComplexityLevel("operacional");
              setTeamSize("4");
              setExpectedMonthsMin("");
              setExpectedMonthsMax("");
              setGlobalMultiplier("1");
              setIncludeWeekend(false);
              setWeekendPercentage("");
            }}
            className="px-6 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            Resetar valores
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CalculadoraPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isUnlocked) {
    return <PasswordScreen onUnlock={() => setIsUnlocked(true)} />;
  }

  return <Calculator />;
}

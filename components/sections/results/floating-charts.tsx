"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { LabelList, Pie, PieChart, Bar, BarChart, Line, LineChart, XAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@shadcn/card";
import { ChartConfig, ChartContainer } from "@shadcn/chart";
import { Badge } from "@shadcn/badge";
import { TrendingUp } from "lucide-react";

// Chart 1: Eficiência Operacional
const efficiencyData = [
  { name: "otimizado", value: 78, fill: "var(--color-otimizado)" },
  { name: "em progresso", value: 22, fill: "var(--color-progresso)" },
];

const efficiencyConfig = {
  value: { label: "Percentual" },
  otimizado: { label: "Otimizado", color: "hsl(160, 84%, 39%)" },
  progresso: { label: "Em progresso", color: "hsl(160, 84%, 39%, 0.3)" },
} satisfies ChartConfig;

// Chart 2: Crescimento Mensal
const growthData = [
  { month: "Jan", crescimento: 12 },
  { month: "Fev", crescimento: 18 },
  { month: "Mar", crescimento: 24 },
  { month: "Abr", crescimento: 32 },
  { month: "Mai", crescimento: 45 },
  { month: "Jun", crescimento: 58 },
];

const growthConfig = {
  crescimento: { label: "Crescimento", color: "hsl(160, 84%, 39%)" },
} satisfies ChartConfig;

// Chart 3: Redução de Custos
const costData = [
  { categoria: "Tempo", antes: 100, depois: 45 },
  { categoria: "Erros", antes: 100, depois: 28 },
  { categoria: "Retrabalho", antes: 100, depois: 35 },
];

const costConfig = {
  antes: { label: "Antes", color: "hsl(0, 0%, 50%)" },
  depois: { label: "Depois", color: "hsl(160, 84%, 39%)" },
} satisfies ChartConfig;

function MiniPieChart() {
  return (
    <Card className="w-[200px] border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Eficiência
          <Badge variant="outline" className="text-primary bg-primary/10 border-none text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            +78%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <ChartContainer config={efficiencyConfig} className="h-[100px] w-full">
          <PieChart>
            <Pie
              data={efficiencyData}
              dataKey="value"
              innerRadius={25}
              outerRadius={40}
              cornerRadius={4}
              paddingAngle={2}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function MiniLineChart() {
  return (
    <Card className="w-[220px] border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Crescimento
          <Badge variant="outline" className="text-primary bg-primary/10 border-none text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            +142%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <ChartContainer config={growthConfig} className="h-[80px] w-full">
          <LineChart data={growthData}>
            <Line
              type="monotone"
              dataKey="crescimento"
              stroke="var(--color-crescimento)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

function MiniBarChart() {
  return (
    <Card className="w-[200px] border-border/50 bg-card/80 backdrop-blur-sm shadow-xl">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium flex items-center justify-between">
          Redução
          <Badge variant="outline" className="text-primary bg-primary/10 border-none text-xs">
            <TrendingUp className="h-3 w-3 mr-1" />
            -65%
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 px-4">
        <ChartContainer config={costConfig} className="h-[80px] w-full">
          <BarChart data={costData} layout="vertical">
            <XAxis type="number" hide />
            <Bar dataKey="depois" fill="var(--color-depois)" radius={4} barSize={12} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function FloatingCharts() {
  const prefersReducedMotion = useReducedMotion();
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    // Só mostrar em telas grandes e sem preferência de motion reduzido
    const isLargeScreen = window.innerWidth >= 1024;
    setShouldShow(isLargeScreen && !prefersReducedMotion);
  }, [prefersReducedMotion]);
  
  // Não renderizar nada em mobile/tablet
  if (!shouldShow) return null;
  
  return (
    <>
      {/* Chart esquerda superior */}
      <motion.div
        className="absolute left-[5%] top-[15%] hidden lg:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <MiniPieChart />
        </motion.div>
      </motion.div>

      {/* Chart direita */}
      <motion.div
        className="absolute right-[5%] top-[25%] hidden lg:block"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MiniLineChart />
        </motion.div>
      </motion.div>

      {/* Chart esquerda inferior */}
      <motion.div
        className="absolute left-[8%] bottom-[20%] hidden xl:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <MiniBarChart />
        </motion.div>
      </motion.div>
    </>
  );
}

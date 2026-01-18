"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Lazy load do componente pesado
const BackgroundRippleEffect = dynamic(
  () => import("@aceternity/background-ripple-effect").then(mod => ({ default: mod.BackgroundRippleEffect })),
  { ssr: false }
);

export function HeroBackground() {
  const [isMobile, setIsMobile] = useState(true);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Em mobile, usar apenas gradiente estático */}
      {isMobile ? (
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
      ) : (
        <BackgroundRippleEffect rows={8} cols={20} cellSize={56} />
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
    </div>
  );
}

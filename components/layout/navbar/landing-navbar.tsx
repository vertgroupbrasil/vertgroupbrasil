"use client";

import { useState } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarButton,
} from "@vert/components/ui/aceternity/resizable-navbar";
import { NavbarLogo } from "./navbar-logo";
import { AnimatedThemeToggler } from "@vert/components/ui/magic/animated-theme-toggler";
import { NAV_ITEMS } from "@vert/config/navigation";

/**
 * LandingNavbar - Navbar principal da Landing Page
 * 
 * Implementa a navbar responsiva com:
 * - Animação de resize ao scroll
 * - Menu mobile com toggle
 * - Suporte a tema dark/light
 * - Links de navegação configuráveis
 */
export function LandingNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <Navbar>
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={NAV_ITEMS} />
        <div className="flex items-center gap-2">
          <AnimatedThemeToggler />
          <NavbarButton variant="primary" href="#cta">
            Agendar conversa
          </NavbarButton>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={handleMobileMenuToggle}
            />
          </div>
        </MobileNavHeader>

        <MobileNavMenu
          isOpen={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.link}
              href={item.link}
              onClick={(e) => {
                e.preventDefault();
                const targetId = item.link.replace("#", "");
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                  targetElement.scrollIntoView({ behavior: "smooth" });
                }
                handleMobileMenuClose();
              }}
              className="w-full rounded-md px-4 py-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
            >
              {item.name}
            </a>
          ))}
          <div className="mt-4 flex w-full flex-col gap-2">
            <NavbarButton
              variant="primary"
              href="#cta"
              onClick={handleMobileMenuClose}
              className="w-full justify-center"
            >
              Agendar conversa
            </NavbarButton>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}

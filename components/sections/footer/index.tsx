"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { BRAND, NAV_ITEMS } from "@vert/config/navigation";
import {
  IconBrandInstagram,
  IconMail,
  IconMapPin,
  IconArrowUpRight,
  IconHeart,
} from "@tabler/icons-react";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    href: "https://instagram.com/vertgroupbrasil",
    icon: IconBrandInstagram,
  },
];

const FOOTER_LINKS = [
  {
    title: "Navegação",
    links: [
      { name: "O Problema", href: "#problema" },
      { name: "Solução", href: "#solucao" },
      { name: "Como Funciona", href: "#como-funciona" },
      { name: "Método", href: "#solucoes" },
    ],
  },
  {
    title: "Mais",
    links: [
      { name: "Parceria", href: "#parceria" },
      { name: "Cases", href: "#cases" },
      { name: "Resultados", href: "#resultados" },
      { name: "FAQ", href: "#faq" },
    ],
  },
];

export function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <footer
      ref={ref}
      className="relative border-t border-border bg-gradient-to-b from-background to-muted/50"
    >
      {/* Main Footer */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/logo-group.svg"
                alt={BRAND.name}
                width={120}
                height={32}
                className="dark:invert-0 invert"
              />
            </Link>

            <p className="mt-4 max-w-xs text-sm text-muted-foreground leading-relaxed">
              guiar processos. construir negócios. juntos. Transformamos operações
              e criamos produtos escaláveis para empresas que querem crescer com método.
            </p>

            {/* Contact Info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:contato.vertgroup@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <IconMail className="h-4 w-4" />
                contato.vertgroup@gmail.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <IconMapPin className="h-4 w-4" />
                Joinville, Santa Catarina
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-muted hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* Link Columns */}
          {FOOTER_LINKS.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: 0.1 * (index + 1), ease: "easeOut" }}
            >
              <h3 className="text-sm font-semibold text-foreground">{column.title}</h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                      <IconArrowUpRight className="h-3 w-3 opacity-0 -translate-y-0.5 translate-x-0.5 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-between gap-4 md:flex-row"
          >
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Vert Group. Todos os direitos reservados.
            </p>

            <p className="flex items-center gap-1 text-xs text-muted-foreground">
              Feito com{" "}
              <IconHeart className="h-3 w-3 text-red-500 fill-red-500" /> em
              Joinville
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Configurações centralizadas da navegação
 * 
 * Mantém todas as configurações de navegação em um único lugar,
 * facilitando manutenção e garantindo consistência.
 */

export interface NavItem {
  name: string;
  link: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: "O Problema", link: "#problema" },
  { name: "Triagem", link: "#triagem" },
  { name: "Serviços", link: "#solucao" },
  { name: "Horizontais", link: "#horizontais" },
  { name: "Como Funciona", link: "#como-funciona" },
  { name: "Complexidade", link: "#complexidade" },
  { name: "Diferença", link: "#principios" },
  { name: "Parceria", link: "#parceria" },
  { name: "Resultado", link: "#resultados" },
  // { name: "Cases", link: "#cases" }, // TODO: Habilitar depois
  { name: "FAQ", link: "#faq" },
];

export const BRAND = {
  name: "Vert Group",
  logo: {
    light: "/v-light.svg",
    dark: "/v-dark.svg",
  },
} as const;

export const ICONES_3D = {
  conversa:    "/icones3d/conversa.webp",
  notificacao: "/icones3d/notificacao.webp",
  painel:      "/icones3d/painel.webp",
  seguranca:   "/icones3d/seguranca.webp",
} as const;

export type Nome3D = keyof typeof ICONES_3D;

/* Leva as peças para o verde esmeralda da logo (matiz ~148°, perto de #2dc46f). */
export const TINGIMENTO_3D = "sepia(1) hue-rotate(93deg) saturate(2.8) brightness(.84) contrast(1.08)";

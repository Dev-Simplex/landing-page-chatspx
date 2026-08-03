"use client"

import { useEffect, useRef } from "react"
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Building2,
  CalendarClock,
  Check,
  Cloud,
  Globe,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  LifeBuoy,
  MessageCircle,
  Minus,
  Plug,
  Rocket,
  Share2,
  Shield,
  Sparkles,
  Users,
  Wallet,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react"
import { TruckButton } from "@/components/truck-button"

const whatsappLink = "https://wa.me/556696571379"

type PlanKey = "basico" | "enterprise"

const plans: {
  key: PlanKey
  name: string
  description: string
  price: string
  setup: string
  badge: string | null
  badgeIcon: LucideIcon | null
  icon: LucideIcon
  truckColor: string
  truckColorLight: string
  tone: {
    accent: string
    border: string
    badge: string
    glow: string
  }
  highlights: { label: string; value: string; included: boolean; icon: LucideIcon }[]
}[] = [
  {
    key: "basico",
    name: "Básico",
    description: "Para equipes que estão centralizando o atendimento pela primeira vez.",
    price: "R$ 1.790",
    setup: "R$ 1.200",
    badge: null,
    badgeIcon: null,
    icon: Rocket,
    truckColor: "#4dd98a",
    truckColorLight: "#6ee5a5",
    tone: {
      accent: "text-emerald-400",
      border: "border-emerald-400/30",
      badge: "bg-emerald-400/15 text-emerald-100 border border-emerald-400/30",
      glow: "hover:shadow-[0_0_32px_-12px_rgba(77,217,138,0.45)]",
    },
    highlights: [
      { label: "Atendentes humanos", value: "3", included: true, icon: Users },
      { label: "Departamentos de IA", value: "1", included: true, icon: Bot },
      { label: "Tipos de canal", value: "WhatsApp e Instagram", included: true, icon: MessageCircle },
      { label: "Dashboard", value: "Essencial", included: true, icon: LayoutDashboard },
      { label: "Suporte", value: "E-mail e chat", included: true, icon: LifeBuoy },
      { label: "IA Captain", value: "Não incluso", included: false, icon: Sparkles },
      { label: "CSM dedicado", value: "Não incluso", included: false, icon: Headphones },
    ],
  },
  {
    key: "enterprise",
    name: "Enterprise",
    description: "O pacote completo do seu segmento, com IA Captain e CSM dedicado.",
    price: "R$ 5.900",
    setup: "R$ 2.900",
    badge: "Pacote do segmento",
    badgeIcon: Sparkles,
    icon: Building2,
    truckColor: "#25a359",
    truckColorLight: "#2dc46f",
    tone: {
      accent: "text-emerald-300",
      border: "border-emerald-500/40",
      badge: "bg-emerald-500/15 text-emerald-100 border border-emerald-500/30",
      glow: "hover:shadow-[0_0_36px_-10px_rgba(45,196,111,0.5)]",
    },
    highlights: [
      { label: "Atendentes humanos", value: "20", included: true, icon: Users },
      { label: "Departamentos de IA", value: "5 (o pacote do segmento)", included: true, icon: Bot },
      {
        label: "Tipos de canal",
        value: "WhatsApp, Instagram, Facebook, Google Business, Site, Reclame Aqui e Mercado Livre",
        included: true,
        icon: MessageCircle,
      },
      { label: "Dashboard", value: "Customizado para o segmento", included: true, icon: LayoutDashboard },
      { label: "Suporte", value: "E-mail, chat, WhatsApp + CSM", included: true, icon: LifeBuoy },
      { label: "IA Captain", value: "Incluso, com treinamento da equipe", included: true, icon: Sparkles },
      { label: "CSM dedicado", value: "Incluso", included: true, icon: Headphones },
    ],
  },
]

const comparison: { label: string; icon: LucideIcon; basico: string; enterprise: string; exclusive?: boolean }[] = [
  { label: "Mensalidade", icon: Wallet, basico: "R$ 1.790", enterprise: "R$ 5.900" },
  { label: "Implantação", icon: Wrench, basico: "R$ 1.200", enterprise: "R$ 2.900" },
  { label: "Atendentes humanos", icon: Users, basico: "3", enterprise: "20" },
  { label: "Departamentos de IA", icon: Bot, basico: "1", enterprise: "5 (o pacote do segmento)" },
  {
    label: "Tipos de canal",
    icon: MessageCircle,
    basico: "WhatsApp e Instagram",
    enterprise: "+ Facebook, Google Business, Site, Reclame Aqui e Mercado Livre",
    exclusive: true,
  },
  {
    label: "Contas por canal",
    icon: Share2,
    basico: "1 de cada tipo ativado",
    enterprise: "1 de cada tipo, ativa se quiser",
  },
  { label: "IA Captain", icon: Sparkles, basico: "—", enterprise: "Incluso, com treinamento da equipe", exclusive: true },
  { label: "CSM dedicado", icon: Headphones, basico: "—", enterprise: "Incluso", exclusive: true },
  { label: "Dashboard", icon: LayoutDashboard, basico: "Essencial", enterprise: "Customizado para o segmento" },
  { label: "Suporte", icon: LifeBuoy, basico: "E-mail e chat", enterprise: "E-mail, chat, WhatsApp + CSM" },
  {
    label: "Integrações",
    icon: Plug,
    basico: "CRM próprio, Calendar, Sheets (self-serve)",
    enterprise: "Seu CRM de preferência + ferramentas personalizadas",
  },
]

const addOns = [
  {
    name: "Atendente extra",
    price: "R$ 150",
    detail: "por mês",
    icon: Users,
    tone: "text-emerald-400",
    glow: "hover:border-emerald-400/40 hover:shadow-[0_0_20px_-12px_rgba(52,211,153,0.45)]",
  },
  {
    name: "IA extra (além das inclusas)",
    price: "R$ 490",
    detail: "por mês + R$ 590 de configuração",
    icon: Bot,
    tone: "text-green-400",
    glow: "hover:border-green-500/40 hover:shadow-[0_0_20px_-12px_rgba(45,196,111,0.45)]",
  },
  {
    name: "Conta extra do mesmo canal",
    price: "R$ 129",
    detail: "por mês",
    icon: Share2,
    tone: "text-emerald-400",
    glow: "hover:border-emerald-400/40 hover:shadow-[0_0_20px_-12px_rgba(77,217,138,0.45)]",
  },
  {
    name: "Implementação assistida",
    price: "R$ 450",
    detail: "por integração",
    icon: Plug,
    tone: "text-green-400",
    glow: "hover:border-green-500/40 hover:shadow-[0_0_20px_-12px_rgba(45,196,111,0.45)]",
  },
  {
    name: "Dashboard sob medida",
    price: "R$ 1.200",
    detail: "cobrança única",
    icon: BarChart3,
    tone: "text-emerald-400",
    glow: "hover:border-emerald-400/40 hover:shadow-[0_0_20px_-12px_rgba(52,211,153,0.45)]",
  },
  {
    name: "Treinamento presencial",
    price: "R$ 2.500",
    detail: "por dia",
    icon: GraduationCap,
    tone: "text-emerald-300",
    glow: "hover:border-emerald-600/40 hover:shadow-[0_0_20px_-12px_rgba(37,163,89,0.45)]",
  },
]

const terms = [
  { term: "12 meses", setup: "Implantação cheia", perk: "2 implementações assistidas" },
  { term: "24 meses", setup: "Implantação com 50% off", perk: "+ dashboard sob medida" },
  { term: "36 meses", setup: "Implantação isenta", perk: "+ 1 dia de treinamento presencial" },
]

const contractNotes = [
  "Contrato mínimo de 12 meses",
  "Reajuste por IPCA a cada 12 meses",
  "Cancelamento antecipado: 30% das parcelas restantes, limitado a 3 mensalidades",
  "Upgrade Básico → Enterprise paga só a diferença de implantação (R$ 1.700)",
  "Downgrade apenas na renovação",
  "LLM e mensagens Meta por conta do cliente (BYOK)",
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="pricing" ref={sectionRef} className="relative py-16 sm:py-24 px-4">
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/80 text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Planos e preços
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 text-balance">
            Dois planos. O seu segmento decide as IAs.
          </h2>
          <p className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            O Enterprise custa o mesmo em qualquer vertical &mdash; o que muda são quais são os 5
            departamentos de IA que entram no pacote.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:max-w-5xl lg:mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.key}
              className={`fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out rounded-3xl border ${
                plan.badge ? "border-white/30 bg-white/10 shadow-2xl" : "border-white/10 bg-white/5"
              } ${plan.tone.border} ${plan.tone.glow} p-6 sm:p-8 flex flex-col`}
            >
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div
                  className={`h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center ${plan.tone.accent}`}
                >
                  <plan.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-white">{plan.name}</h3>
                {plan.badge && (
                  <span
                    className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full flex items-center gap-2 ${plan.tone.badge}`}
                  >
                    {plan.badgeIcon ? <plan.badgeIcon className="h-3.5 w-3.5" /> : null}
                    {plan.badge}
                  </span>
                )}
              </div>

              <p className="text-sm text-white/70 mb-6">{plan.description}</p>

              <div className="flex items-end gap-2">
                <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-white/60 pb-1">/mês</span>
              </div>
              <div className="mt-2 mb-6 inline-flex items-center gap-2 text-sm text-white/60">
                <Wrench className={`h-4 w-4 ${plan.tone.accent}`} />
                Implantação: <span className="text-white/85 font-medium">{plan.setup}</span>
              </div>

              <div className="space-y-3 flex-1">
                {plan.highlights.map((feature) => (
                  <div key={feature.label} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-[18px] w-[18px] text-emerald-400 mt-0.5 shrink-0" />
                    ) : (
                      <Minus className="h-[18px] w-[18px] text-white/30 mt-0.5 shrink-0" />
                    )}
                    <feature.icon
                      className={`h-[18px] w-[18px] mt-0.5 shrink-0 ${
                        feature.included ? plan.tone.accent : "text-white/30"
                      }`}
                    />
                    <div className={`text-sm ${feature.included ? "text-white/80" : "text-white/45"}`}>
                      <span className={`font-medium ${feature.included ? "text-white" : "text-white/60"}`}>
                        {feature.label}:
                      </span>{" "}
                      {feature.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-8">
                <TruckButton
                  defaultText="Quero esse plano"
                  successText="Pedido enviado!"
                  redirectUrl={whatsappLink}
                  primaryColor={plan.truckColor}
                  primaryLightColor={plan.truckColorLight}
                  className="truck-button-custom"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Comparativo completo */}
        <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-12 sm:mt-16">
          <div className="text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">Comparativo completo</h3>
            <p className="text-sm text-white/60 mt-2">
              Item a item, o que cada plano entrega.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
            <div className="hidden md:grid grid-cols-[1.1fr_1fr_1.4fr] gap-4 px-6 py-4 border-b border-white/10 bg-white/[0.04]">
              <div className="text-xs uppercase tracking-[0.18em] text-white/45">Recurso</div>
              <div className="text-sm font-semibold text-white">Básico</div>
              <div className="text-sm font-semibold text-emerald-300 flex items-center gap-2">
                Enterprise
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </div>

            {comparison.map((row, index) => (
              <div
                key={row.label}
                className={`px-5 sm:px-6 py-4 ${index % 2 === 1 ? "bg-white/[0.02]" : ""} ${
                  index === 0 ? "" : "border-t border-white/[0.06]"
                } md:grid md:grid-cols-[1.1fr_1fr_1.4fr] md:gap-4 md:items-start`}
              >
                <div className="flex items-center gap-2.5 text-sm font-medium text-white">
                  <row.icon className="h-4 w-4 text-emerald-400/80 shrink-0" />
                  {row.label}
                  {row.exclusive && (
                    <span className="md:hidden text-[10px] uppercase tracking-wide text-emerald-300/70">
                      só no Enterprise
                    </span>
                  )}
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 md:mt-0 md:contents">
                  <div className="md:contents">
                    <div className="md:hidden text-[10px] uppercase tracking-[0.18em] text-white/40 mb-1">
                      Básico
                    </div>
                    <div className="text-sm text-white/65">{row.basico}</div>
                  </div>
                  <div className="md:contents">
                    <div className="md:hidden text-[10px] uppercase tracking-[0.18em] text-emerald-300/60 mb-1">
                      Enterprise
                    </div>
                    <div className="text-sm text-white/85">{row.enterprise}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Adicionais */}
        <div className="mt-12 sm:mt-16">
          <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">Adicionais</h3>
            <p className="text-sm text-white/60 mt-2">
              Valem nos dois planos, sem teto. Habilitados na cobrança mediante autorização do cliente.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {addOns.map((item) => (
              <div
                key={item.name}
                className={`fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5 group hover:bg-white/10 hover:border-white/20 ${item.glow}`}
              >
                <div className="flex items-start gap-3">
                  <item.icon className={`h-5 w-5 ${item.tone} shrink-0`} />
                  <div className="text-sm text-white/80">{item.name}</div>
                </div>
                <div className="text-xl font-semibold text-white mt-2">{item.price}</div>
                <div className="text-xs text-white/50 mt-1">{item.detail}</div>
              </div>
            ))}
          </div>

          <p className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-xs text-white/50 text-center mt-6">
            Só três coisas não se compram fora do Enterprise: IA Captain, CSM dedicado e os tipos de
            canal além de WhatsApp e Instagram.
          </p>
        </div>

        {/* Somar x subir */}
        <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/[0.08] via-white/[0.02] to-transparent p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />
            <div className="relative grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300 mb-3">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  Somar nunca sai mais barato que subir
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-white mb-3 text-balance">
                  Montar o Enterprise por peças custa mais e entrega menos
                </h4>
                <p className="text-sm sm:text-[15px] text-white/65 leading-relaxed">
                  Partindo do Básico e comprando adicionais até chegar em 5 departamentos de IA e 20
                  atendentes, a conta fecha em <span className="text-white font-medium">R$ 6.300</span> por
                  mês &mdash; e ainda sem IA Captain, sem CSM dedicado e sem os outros cinco tipos de canal.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-5 text-center">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-white/45 mb-1.5">
                    Básico + adicionais
                  </div>
                  <div className="text-2xl font-bold text-white/70 tabular-nums line-through decoration-white/30">
                    R$ 6.300
                  </div>
                  <div className="mt-1 text-[11px] text-white/40">sem Captain e sem CSM</div>
                </div>
                <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-4 py-5 text-center">
                  <div className="text-[10px] uppercase tracking-[0.14em] text-emerald-200/70 mb-1.5">
                    Enterprise
                  </div>
                  <div className="text-2xl font-bold text-white tabular-nums">R$ 5.900</div>
                  <div className="mt-1 text-[11px] text-emerald-200/70">pacote completo</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prazo e condições */}
        <div className="mt-12 sm:mt-16">
          <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              A mensalidade não cai. O que se negocia é a implantação.
            </h3>
            <p className="text-sm text-white/60 mt-2">
              Quanto maior o prazo, menor o custo de entrada &mdash; e mais escopo entra junto.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {terms.map((item) => (
              <div
                key={item.term}
                className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/[0.07] hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-2 text-emerald-300">
                  <CalendarClock className="h-4 w-4" />
                  <span className="text-sm font-semibold uppercase tracking-wide">{item.term}</span>
                </div>
                <div className="mt-3 text-lg font-semibold text-white">{item.setup}</div>
                <div className="mt-2 flex items-start gap-2 text-sm text-white/60">
                  <Check className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                  {item.perk}
                </div>
              </div>
            ))}
          </div>

          <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
            <div className="flex items-center gap-2 text-emerald-300 mb-3">
              <Wallet className="h-4 w-4" />
              <span className="text-xs font-semibold uppercase tracking-[0.18em]">Anual à vista</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Pagando o ano à vista, você escolhe: <span className="text-white font-medium">um mês por
              nossa conta</span> (paga 11, leva 12) ou <span className="text-white font-medium">escopo</span>{" "}
              (1 departamento de IA configurado sem custo + dashboard sob medida).
            </p>
          </div>

          <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45 mb-3">
              Demais condições
            </div>
            <ul className="grid gap-2 sm:grid-cols-2">
              {contractNotes.map((note) => (
                <li key={note} className="flex items-start gap-2 text-xs sm:text-[13px] text-white/55">
                  <span className="mt-1.5 h-1 w-1 rounded-full bg-emerald-400/70 shrink-0" />
                  {note}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AWS */}
        <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out mt-12 sm:mt-16">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] via-white/[0.025] to-transparent p-6 sm:p-8">
            <div className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-[#FF9900]/15 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" aria-hidden="true" />
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              aria-hidden="true"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center">
              <div className="flex items-center gap-5 shrink-0">
                <div className="relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-2xl border border-white/10 bg-[#0b0b0c]/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_60px_-20px_rgba(255,153,0,0.35)]">
                  <span className="absolute inset-x-3 top-3 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <svg
                    viewBox="0 0 96 56"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Amazon Web Services"
                    className="h-12 sm:h-14 w-auto"
                  >
                    <text
                      x="48"
                      y="32"
                      textAnchor="middle"
                      fontFamily="'Helvetica Neue', Arial, sans-serif"
                      fontWeight="800"
                      fontSize="28"
                      letterSpacing="-1"
                      fill="#ffffff"
                    >
                      aws
                    </text>
                    <path
                      d="M14 46 Q 48 58 82 46"
                      stroke="#FF9900"
                      strokeWidth="3.2"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M74 42 L 82 46 L 76 51"
                      stroke="#FF9900"
                      strokeWidth="3.2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="lg:hidden">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF9900]">
                    <Cloud className="h-3 w-3" />
                    Powered by AWS
                  </div>
                  <div className="mt-1 text-base font-semibold text-white">
                    Infraestrutura premium
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <div className="hidden lg:inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#FF9900] mb-2">
                  <Cloud className="h-3.5 w-3.5" />
                  Powered by AWS &middot; Amazon Web Services
                </div>
                <h4 className="text-xl sm:text-2xl font-semibold text-white mb-2 text-balance">
                  Hospedado em nuvem de alta performance
                </h4>
                <p className="text-sm sm:text-[15px] text-white/65 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Sua operação roda na mesma infraestrutura usada pelas maiores empresas do mundo.
                  Escala elástica, latência baixa e segurança de nível empresarial &mdash; sem complicação.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0 w-full lg:w-auto">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3.5 sm:px-4 sm:py-4 text-center backdrop-blur-sm">
                  <Zap className="h-4 w-4 mx-auto text-[#FF9900] mb-1.5" />
                  <div className="text-lg sm:text-xl font-bold text-white tabular-nums tracking-tight">
                    99,9<span className="text-white/50">%</span>
                  </div>
                  <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/50">
                    Uptime
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3.5 sm:px-4 sm:py-4 text-center backdrop-blur-sm">
                  <Shield className="h-4 w-4 mx-auto text-[#FF9900] mb-1.5" />
                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight">SLA</div>
                  <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/50">
                    Garantido
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-3.5 sm:px-4 sm:py-4 text-center backdrop-blur-sm">
                  <Globe className="h-4 w-4 mx-auto text-[#FF9900] mb-1.5" />
                  <div className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    sa-east-1
                  </div>
                  <div className="mt-0.5 text-[9px] sm:text-[10px] uppercase tracking-[0.14em] text-white/50">
                    Região BR
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

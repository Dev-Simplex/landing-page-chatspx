"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import {
  BarChart3,
  Bot,
  Brain,
  Check,
  Headphones,
  Plug,
  Rocket,
  Settings,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Workflow,
  X,
  ArrowRight,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { TruckButton } from "@/components/truck-button"

const plans = [
  {
    name: "Start",
    description: "Para equipes que estao comecando no atendimento centralizado.",
    price: "R$ 280,00",
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
      button:
        "bg-emerald-500 text-white hover:bg-emerald-400 focus-visible:ring-emerald-400 hover:shadow-[0_0_20px_-8px_rgba(77,217,138,0.6)]",
    },
    features: [
      { label: "Numeros de WhatsApp", value: "2", included: true },
      { label: "Agentes", value: "5", included: true },
      { label: "Suporte", value: "Basico (Email e Chat)", included: true },
      { label: "Dashboards", value: "1 Basico", included: true },
      { label: "Fluxos de Atendimento", value: "Nao incluso", included: false },
      { label: "API Personalizada", value: "Nao incluso", included: false },
    ],
  },
  {
    name: "Standard",
    description: "O equilibrio ideal entre volume, dados e automacao.",
    price: "R$ 580,00",
    badge: "Mais escolhido",
    badgeIcon: Star,
    icon: Settings,
    truckColor: "#2dc46f",
    truckColorLight: "#4dd98a",
    tone: {
      accent: "text-green-500",
      border: "border-green-500/30",
      badge: "bg-green-500/15 text-green-100 border border-green-500/30",
      glow: "hover:shadow-[0_0_32px_-12px_rgba(45,196,111,0.45)]",
      button:
        "bg-green-600 text-white hover:bg-green-500 focus-visible:ring-green-500 hover:shadow-[0_0_20px_-8px_rgba(45,196,111,0.6)]",
    },
    features: [
      { label: "Numeros de WhatsApp", value: "3", included: true },
      { label: "Agentes", value: "10", included: true },
      { label: "Suporte", value: "Avancado (Email e Chat)", included: true },
      { label: "Dashboards", value: "2 Basicos", included: true },
      { label: "Fluxos de Atendimento", value: "1 para atendimento", included: true },
      { label: "API Personalizada", value: "Nao incluso", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "Para operacoes com alto volume e IA aplicada.",
    price: "R$ 890,00",
    badge: "IA & Escala",
    badgeIcon: Sparkles,
    icon: Brain,
    truckColor: "#25a359",
    truckColorLight: "#2dc46f",
    tone: {
      accent: "text-emerald-600",
      border: "border-emerald-600/30",
      badge: "bg-emerald-600/15 text-emerald-100 border border-emerald-600/30",
      glow: "hover:shadow-[0_0_32px_-12px_rgba(37,163,89,0.45)]",
      button:
        "bg-emerald-700 text-white hover:bg-emerald-600 focus-visible:ring-emerald-600 hover:shadow-[0_0_20px_-8px_rgba(37,163,89,0.6)]",
    },
    features: [
      { label: "Numeros de WhatsApp", value: "5", included: true },
      { label: "Agentes", value: "20", included: true },
      { label: "Suporte", value: "Premium (Email, Chat e WhatsApp)", included: true },
      { label: "Dashboards", value: "5 Premium", included: true },
      { label: "Fluxos de Atendimento", value: "2 com IA", included: true },
      { label: "API Personalizada", value: "Incluso", included: true },
    ],
  },
]

const addOns = [
  {
    name: "Numeros de WhatsApp",
    price: "R$ 69,90",
    detail: "Mensal",
    icon: Smartphone,
    tone: "text-emerald-400",
    glow: "hover:border-emerald-400/40 hover:shadow-[0_0_20px_-12px_rgba(52,211,153,0.45)]",
  },
  {
    name: "Agentes",
    price: "R$ 16,90",
    detail: "Mensal",
    icon: Users,
    tone: "text-green-500",
    glow: "hover:border-green-500/40 hover:shadow-[0_0_20px_-12px_rgba(45,196,111,0.45)]",
  },
  {
    name: "Fluxo de IA",
    price: "R$ 120,00",
    detail: "Hora tecnica",
    icon: Bot,
    tone: "text-green-500",
    glow: "hover:border-green-500/40 hover:shadow-[0_0_20px_-12px_rgba(45,196,111,0.45)]",
  },
  {
    name: "Dashboards",
    price: "R$ 1.200,00",
    detail: "Unico por dashboard",
    icon: BarChart3,
    tone: "text-emerald-400",
    glow: "hover:border-emerald-400/40 hover:shadow-[0_0_20px_-12px_rgba(77,217,138,0.45)]",
  },
  {
    name: "Fluxos de Atendimento",
    price: "R$ 520,00",
    detail: "Unico por fluxo",
    icon: Workflow,
    tone: "text-emerald-600",
    glow: "hover:border-emerald-600/40 hover:shadow-[0_0_20px_-12px_rgba(37,163,89,0.45)]",
  },
]

const whatsappLink = "https://wa.me/556696571379"

const featureIconMap: Record<string, LucideIcon> = {
  "Numeros de WhatsApp": Smartphone,
  Agentes: Users,
  Suporte: Headphones,
  Dashboards: BarChart3,
  "Fluxos de Atendimento": Workflow,
  "API Personalizada": Plug,
}

const getFeatureIcon = (feature: { label: string; value: string }): LucideIcon => {
  if (feature.label === "Fluxos de Atendimento") {
    return feature.value.toLowerCase().includes("ia") ? Bot : Workflow
  }

  return featureIconMap[feature.label] || Check
}

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
            Planos e precos
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 text-balance">
            Planos que crescem com o seu atendimento
          </h2>
          <p className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
            Escolha o plano ideal e adicione recursos conforme sua operacao evolui.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out rounded-3xl border ${
                plan.badge
                  ? "border-white/30 bg-white/10 shadow-2xl"
                  : "border-white/10 bg-white/5"
              } ${plan.tone.border} ${plan.tone.glow} p-6 sm:p-8 flex flex-col`}
            >
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-11 w-11 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center ${plan.tone.accent}`}
                  >
                    <plan.icon className="h-7 w-7" />
                  </div>
                  <div className="flex items-center gap-3">
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
                </div>
              </div>
              <p className="text-sm text-white/70 mb-6">{plan.description}</p>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-white">{plan.price}</span>
                <span className="text-sm text-white/60">/mes</span>
              </div>

              <div className="space-y-3 flex-1">
                {plan.features.map((feature) => {
                  const FeatureIcon = getFeatureIcon(feature)
                  return (
                    <div key={feature.label} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-[18px] w-[18px] text-emerald-400 mt-0.5 shrink-0" />
                      ) : (
                        <X className="h-[18px] w-[18px] text-white/40 mt-0.5 shrink-0" />
                      )}
                      <FeatureIcon
                        className={`h-[18px] w-[18px] mt-0.5 shrink-0 ${
                          feature.included ? plan.tone.accent : "text-white/40"
                        }`}
                      />
                      <div className="text-sm text-white/80">
                        <span className="font-medium text-white">{feature.label}:</span> {feature.value}
                      </div>
                    </div>
                  )
                })}
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

        <div className="mt-12 sm:mt-16">
          <div className="fade-in-element opacity-0 translate-y-6 transition-all duration-1000 ease-out text-center mb-6">
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">Adicionais</h3>
            <p className="text-sm text-white/60 mt-2">
              Itens habilitados na cobranca mediante autorizacao do cliente.
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
            Valores adicionais sao habilitados mediante autorizacao do cliente.
          </p>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import { TestimonialsColumn } from "@/components/ui/testimonials-column"

export function TestimonialsSection() {
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
              }, index * 300)
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

  const testimonials = [
    {
      text: "Centralizamos WhatsApp, e-mail e site em um único inbox. O tempo de resposta caiu pela metade.",
      name: "Ana Paula",
      role: "Coordenadora de Suporte",
    },
    {
      text: "Com o Captain, resolvemos perguntas repetidas e liberamos a equipe para casos complexos.",
      name: "Bruno Mendes",
      role: "Head de Atendimento",
    },
    {
      text: "A auto-hospedagem nos deu controle total dos dados e compliance.",
      name: "Carla Souza",
      role: "Diretora de TI",
    },
    {
      text: "Integramos o Slack e os alertas chegam em tempo real para o time.",
      name: "Diego Almeida",
      role: "Gerente de Operações",
    },
    {
      text: "Os relatórios e o CSAT facilitaram a gestão de performance.",
      name: "Fernanda Rocha",
      role: "Gerente de Experiência do Cliente",
    },
    {
      text: "As automações e respostas prontas reduziram o tempo médio de atendimento.",
      name: "Gustavo Lima",
      role: "Supervisor",
    },
    {
      text: "O help center diminuiu o volume de tickets recorrentes.",
      name: "Helena Costa",
      role: "Suporte de Produto",
    },
    {
      text: "Segmentação de contatos e campanhas ajudaram a reativar clientes.",
      name: "Igor Santos",
      role: "Líder de Growth",
    },
  ]

  return (
    <section id="testimonials" ref={sectionRef} className="relative pt-16 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section - Keep as user loves it */}
        <div className="text-center mb-16 md:mb-32">
          <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out inline-flex items-center gap-2 text-white/60 text-sm font-medium tracking-wider uppercase mb-6">
            <div className="w-8 h-px bg-white/30"></div>
            Histórias reais
            <div className="w-8 h-px bg-white/30"></div>
          </div>
          <h2 className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-5xl md:text-6xl lg:text-7xl font-light text-white mb-8 tracking-tight text-balance">
            Times que <span className="font-medium italic">potencializamos</span>
          </h2>
          <p className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
            Veja como equipes transformam o atendimento com o CHAT - SPX e IA aplicada ao suporte
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out relative flex justify-center items-center min-h-[600px] md:min-h-[800px] overflow-hidden">
          <div
            className="flex gap-8 max-w-6xl"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            }}
          >
            <TestimonialsColumn testimonials={testimonials.slice(0, 3)} duration={15} className="flex-1" />
            <TestimonialsColumn
              testimonials={testimonials.slice(2, 5)}
              duration={12}
              className="flex-1 hidden md:block"
            />
            <TestimonialsColumn
              testimonials={testimonials.slice(1, 4)}
              duration={18}
              className="flex-1 hidden lg:block"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

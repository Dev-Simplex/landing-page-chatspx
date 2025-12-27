"use client"
import { useEffect, useRef } from "react"

export function InstagramServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Agendamentos de serviço",
      description:
        "O CHAT - SPX agenda serviços e envia confirmações em site, telefone e redes sociais, conforme seu fluxo",
    },
    {
      title: "Consulta de peças",
      description: "Responde sobre disponibilidade, preços e prazos com base no estoque em tempo real",
    },
    {
      title: "Gestão de pedidos",
      description: "Processa pedidos e envia atualizações sem intervenção humana, integrado aos seus sistemas",
    },
    {
      title: "Atualizações ao cliente",
      description: "Mantém clientes informados sobre status do serviço e peças 24/7 em qualquer canal",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 100)
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
    null
  )
}

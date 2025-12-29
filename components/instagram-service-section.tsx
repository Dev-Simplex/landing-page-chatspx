"use client"
import { useEffect, useRef } from "react"

export function InstagramServiceSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Agendamentos de servi\u00e7o",
      description:
        "O CHAT - SPX agenda servi\u00e7os e envia confirma\u00e7\u00f5es em site, telefone e redes sociais, conforme seu fluxo",
    },
    {
      title: "Consulta de pe\u00e7as",
      description: "Responde sobre disponibilidade, pre\u00e7os e prazos com base no estoque em tempo real",
    },
    {
      title: "Gest\u00e3o de pedidos",
      description:
        "Processa pedidos e envia atualiza\u00e7\u00f5es sem interven\u00e7\u00e3o humana, integrado aos seus sistemas",
    },
    {
      title: "Atualiza\u00e7\u00f5es ao cliente",
      description:
        "Mant\u00e9m clientes informados sobre status do servi\u00e7o e pe\u00e7as 24/7 em qualquer canal",
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

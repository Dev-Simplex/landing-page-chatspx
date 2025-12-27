"use client"
import { useEffect, useRef } from "react"

export function TyreKickersSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const benefits = [
    {
      title: "Respostas instantâneas",
      description:
        "O CHAT - SPX responde perguntas comuns sobre vistoria, quilometragem, trocas e preços em todos os canais",
    },
    {
      title: "Qualifique leads",
      description: "Filtra compradores reais fazendo as perguntas certas para sua concessionária",
    },
    {
      title: "Economize tempo",
      description: "Deixe o CHAT - SPX lidar com curiosos e perguntas repetidas",
    },
    {
      title: "Disponível 24/7",
      description: "Nunca perca uma consulta séria enquanto filtra o que não importa, em qualquer canal",
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

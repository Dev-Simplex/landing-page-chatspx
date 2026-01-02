"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useMemo, useRef, useState } from "react"
import styles from "./system-screens-carousel.module.css"

const screens = [
  {
    id: "inbox",
    label: "Tela 01",
    category: "Inbox",
    title: "Inbox unificada",
    summary: "Todas as conversas reunidas com status e prioridade.",
    description:
      "Visualize filas, responsaveis e contexto completo para cada conversa em um unico painel.",
    image: "/images/carrousel/tela_01.svg",
  },
  {
    id: "sla",
    label: "Tela 02",
    category: "Atendimento",
    title: "Fila e SLA",
    summary: "Distribuicao inteligente com alertas e metas.",
    description:
      "Organize equipes por turno, aplique regras de SLA e acompanhe atendimentos em tempo real.",
    image: "/images/carrousel/tela_02.svg",
  },
  {
    id: "profile",
    label: "Tela 03",
    category: "Perfil",
    title: "Perfil do cliente",
    summary: "Historico completo para respostas rapidas.",
    description:
      "Dados, tags e eventos em um unico lugar para personalizar o atendimento.",
    image: "/images/carrousel/tela_03.svg",
  },
  {
    id: "automation",
    label: "Tela 04",
    category: "Fluxos",
    title: "Automacoes",
    summary: "Regras, IA e webhooks em minutos.",
    description:
      "Crie fluxos para respostas iniciais, triagem e notificacoes automaticas.",
    image: "/images/carrousel/tela_04.svg",
  },
  {
    id: "analytics",
    label: "Tela 05",
    category: "Insights",
    title: "Relatorios ao vivo",
    summary: "KPIs e performance por canal e equipe.",
    description:
      "Acompanhe tempo medio, volume por canal e qualidade com dashboards em tempo real.",
    image: "/images/carrousel/tela_05.svg",
  },
  {
    id: "integrations",
    label: "Tela 06",
    category: "Integracoes",
    title: "Integracoes do sistema",
    summary: "Webhooks, Painel de Aplicativos, OpenAI e mais.",
    description:
      "Conecte Webhooks, Painel de Aplicativos, OpenAI, Dialogflow, Tradutor do Google, Dyte e LeadSquared.",
    image: "/images/carrousel/tela_06.svg",
  },
]

const normalizeIndex = (index: number, total: number) => ((index % total) + total) % total

export function SystemScreensCarouselSection() {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const thetaRef = useRef(0)
  const dragState = useRef({
    isDragging: false,
    startX: 0,
    startTheta: 0,
    moved: false,
    hasCapture: false,
  })

  const totalCards = screens.length
  const anglePerCard = 360 / totalCards
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const cardAngles = useMemo(() => screens.map((_, index) => index * anglePerCard), [anglePerCard])

  useEffect(() => {
    const newTheta = -currentIndex * anglePerCard
    thetaRef.current = newTheta
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`
    }
  }, [currentIndex, anglePerCard])

  const snapToNearest = () => {
    const nearestIndex = normalizeIndex(Math.round(-thetaRef.current / anglePerCard), totalCards)
    setCurrentIndex(nearestIndex)
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => normalizeIndex(prev - 1, totalCards))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => normalizeIndex(prev + 1, totalCards))
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    dragState.current.isDragging = true
    dragState.current.startX = event.clientX
    dragState.current.startTheta = thetaRef.current
    dragState.current.moved = false
    dragState.current.hasCapture = false
    setIsDragging(true)
  }

  const releasePointerCaptureSafe = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.hasCapture && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
      dragState.current.hasCapture = false
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return
    const diffX = event.clientX - dragState.current.startX
    if (Math.abs(diffX) > 6) {
      dragState.current.moved = true
      if (!dragState.current.hasCapture) {
        event.currentTarget.setPointerCapture(event.pointerId)
        dragState.current.hasCapture = true
      }
    }
    const sensitivity = 0.35
    const newTheta = dragState.current.startTheta + diffX * sensitivity
    thetaRef.current = newTheta
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return
    dragState.current.isDragging = false
    setIsDragging(false)
    releasePointerCaptureSafe(event)
    snapToNearest()
  }

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isDragging) return
    dragState.current.isDragging = false
    setIsDragging(false)
    releasePointerCaptureSafe(event)
    snapToNearest()
  }

  const handleCardClick = (index: number) => {
    if (dragState.current.moved) return
    if (index !== currentIndex) return
    setFlippedIndex((prev) => (prev === index ? null : index))
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      handlePrev()
    } else if (event.key === "ArrowRight") {
      event.preventDefault()
      handleNext()
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setFlippedIndex((prev) => (prev === currentIndex ? null : currentIndex))
    }
  }

  return (
    <section id="screens" className={`relative py-16 sm:py-24 px-4 ${styles.section}`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black"></div>
      <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-500/20 blur-[140px]"></div>
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 rounded-full bg-emerald-400/10 blur-[160px]"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
            Telas do sistema
          </div>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-semibold text-white text-balance">
            Veja o CHAT - SPX por dentro
          </h2>
          <p className="mt-4 text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Arraste o carrossel para explorar as principais telas e entender o fluxo do atendimento.
          </p>
        </div>

        <div
          className={`${styles.carouselStage} mt-12 ${isDragging ? styles.dragging : ""}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerCancel}
          onKeyDown={handleKeyDown}
          role="region"
          aria-label="Carrossel de telas do sistema"
          tabIndex={0}
        >
          <div ref={carouselRef} className={styles.carousel}>
            {screens.map((screen, index) => (
              <button
                key={screen.id}
                type="button"
                onClick={() => handleCardClick(index)}
                className={`${styles.card} ${flippedIndex === index ? styles.flipped : ""}`}
                style={{ "--angle": `${cardAngles[index]}deg` } as React.CSSProperties}
                aria-pressed={flippedIndex === index}
                aria-label={`Detalhes da tela ${screen.title}`}
              >
                <div className={styles.cardInner}>
                  <div className={`${styles.cardFace} ${styles.cardFront}`}>
                    <div className="flex h-full flex-col p-5 sm:p-6">
                      <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.35em] text-emerald-200/70">
                        <span>{screen.label}</span>
                        <span className="text-white/50">{screen.category}</span>
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">{screen.title}</h3>
                      <div className={styles.screenFrame}>
                        <Image
                          src={screen.image}
                          alt={`Preview ${screen.title}`}
                          fill
                          sizes="(max-width: 768px) 220px, 280px"
                          className={styles.screenImage}
                          draggable={false}
                        />
                        <div className={styles.screenGlare} />
                        <div className={styles.scanLines} />
                      </div>
                      <p className="mt-4 text-sm text-white/70 leading-relaxed">{screen.summary}</p>
                      <div className="mt-auto flex items-center gap-2 text-xs text-emerald-200/70">
                        <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                        Clique para detalhes
                      </div>
                    </div>
                  </div>
                  <div className={`${styles.cardFace} ${styles.cardBack}`}>
                    <div className="flex h-full flex-col p-5 sm:p-6">
                      <div className="text-[0.7rem] uppercase tracking-[0.35em] text-emerald-200/70">
                        {screen.label}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold text-white">{screen.title}</h3>
                      <p className="mt-4 text-sm text-white/70 leading-relaxed">{screen.description}</p>
                      <div className="mt-auto flex items-center justify-between text-xs text-white/60">
                        <span>Arraste para navegar</span>
                        <span className="text-emerald-300">Enter para virar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4 relative z-20">
          <button
            type="button"
            onClick={handlePrev}
            className="h-11 w-11 rounded-full border border-emerald-400/40 bg-black/40 text-emerald-200 transition hover:-translate-y-0.5 hover:bg-black/70"
            aria-label="Tela anterior"
          >
            <ChevronLeft className="h-5 w-5 mx-auto" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="h-11 w-11 rounded-full border border-emerald-400/40 bg-black/40 text-emerald-200 transition hover:-translate-y-0.5 hover:bg-black/70"
            aria-label="Proxima tela"
          >
            <ChevronRight className="h-5 w-5 mx-auto" />
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-white/60">
          Use as setas ou arraste para navegar. Clique na tela ativa para virar.
        </p>
      </div>
    </section>
  )
}

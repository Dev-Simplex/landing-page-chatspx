"use client"

import Image from "next/image"
import { ChevronLeft, ChevronRight, Minus, Plus, X, ZoomIn } from "lucide-react"
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
  const stageRef = useRef<HTMLDivElement | null>(null)
  const thetaRef = useRef(0)
  const dragState = useRef({
    isDragging: false,
    isPointerDown: false,
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
  const [isAnimating, setIsAnimating] = useState(false)
  const [isFlipping, setIsFlipping] = useState(false)
  const [zoomedScreen, setZoomedScreen] = useState<(typeof screens)[number] | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [overlayScale, setOverlayScale] = useState(1)
  const animationTimeoutRef = useRef<number | null>(null)
  const flipTimeoutRef = useRef<number | null>(null)
  const activeScreen = screens[currentIndex]
  const isFlipped = flippedIndex === currentIndex
  const showFrontOverlay = !isDragging && !isAnimating && !isFlipping && !isFlipped
  const showBackOverlay = !isDragging && !isAnimating && !isFlipping && isFlipped

  const cardAngles = useMemo(() => screens.map((_, index) => index * anglePerCard), [anglePerCard])

  useEffect(() => {
    const newTheta = -currentIndex * anglePerCard
    thetaRef.current = newTheta
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`
    }
  }, [currentIndex, anglePerCard])

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current)
      }
      if (flipTimeoutRef.current) {
        window.clearTimeout(flipTimeoutRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const updateScale = () => {
      if (!stageRef.current) return
      const computed = getComputedStyle(stageRef.current)
      const perspective = parseFloat(computed.getPropertyValue("--perspective")) || 1200
      const radius = parseFloat(computed.getPropertyValue("--carousel-radius")) || 380
      const scale = perspective / (perspective - radius)
      setOverlayScale(Number.isFinite(scale) ? scale : 1)
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  useEffect(() => {
    if (!zoomedScreen) return
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyPadding = document.body.style.paddingRight
    const previousHtmlOverflow = document.documentElement.style.overflow
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = "hidden"
    document.documentElement.style.overflow = "hidden"
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setZoomedScreen(null)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.body.style.paddingRight = previousBodyPadding
      document.documentElement.style.overflow = previousHtmlOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [zoomedScreen])

  const startAnimationLock = () => {
    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current)
    }
    setIsAnimating(true)
    animationTimeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false)
      animationTimeoutRef.current = null
    }, 500)
  }

  const startFlipLock = () => {
    if (flipTimeoutRef.current) {
      window.clearTimeout(flipTimeoutRef.current)
    }
    setIsFlipping(true)
    flipTimeoutRef.current = window.setTimeout(() => {
      setIsFlipping(false)
      flipTimeoutRef.current = null
    }, 650)
  }

  const snapToNearest = () => {
    const nearestIndex = normalizeIndex(Math.round(-thetaRef.current / anglePerCard), totalCards)
    const snappedTheta = -nearestIndex * anglePerCard
    thetaRef.current = snappedTheta
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${snappedTheta}deg)`
    }
    startAnimationLock()
    setCurrentIndex(nearestIndex)
  }

  const handlePrev = () => {
    startAnimationLock()
    setCurrentIndex((prev) => normalizeIndex(prev - 1, totalCards))
  }

  const handleNext = () => {
    startAnimationLock()
    setCurrentIndex((prev) => normalizeIndex(prev + 1, totalCards))
  }

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    dragState.current.isPointerDown = true
    dragState.current.isDragging = false
    dragState.current.startX = event.clientX
    dragState.current.startTheta = thetaRef.current
    dragState.current.moved = false
    dragState.current.hasCapture = false
  }

  const releasePointerCaptureSafe = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragState.current.hasCapture && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
      dragState.current.hasCapture = false
    }
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isPointerDown) return
    const diffX = event.clientX - dragState.current.startX
    const hasMovedEnough = Math.abs(diffX) > 6
    if (!dragState.current.moved && !hasMovedEnough) return
    if (!dragState.current.moved && hasMovedEnough) {
      dragState.current.moved = true
      dragState.current.isDragging = true
      setIsDragging(true)
    }
    if (dragState.current.isDragging && !dragState.current.hasCapture) {
      event.currentTarget.setPointerCapture(event.pointerId)
      dragState.current.hasCapture = true
    }
    const sensitivity = 0.35
    const newTheta = dragState.current.startTheta + diffX * sensitivity
    thetaRef.current = newTheta
    if (carouselRef.current) {
      carouselRef.current.style.transform = `rotateY(${newTheta}deg)`
    }
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isPointerDown) return
    dragState.current.isPointerDown = false
    if (dragState.current.isDragging) {
      dragState.current.isDragging = false
      setIsDragging(false)
      releasePointerCaptureSafe(event)
      snapToNearest()
      return
    }
    releasePointerCaptureSafe(event)
  }

  const handlePointerCancel = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragState.current.isPointerDown) return
    dragState.current.isPointerDown = false
    if (dragState.current.isDragging) {
      dragState.current.isDragging = false
      setIsDragging(false)
      releasePointerCaptureSafe(event)
      snapToNearest()
      return
    }
    releasePointerCaptureSafe(event)
  }

  const handleCardClick = (index: number) => {
    if (dragState.current.moved) return
    if (index !== currentIndex) return
    startFlipLock()
    setFlippedIndex((prev) => (prev === index ? null : index))
  }

  const handleZoomOpen = (event: React.MouseEvent, screen: (typeof screens)[number]) => {
    event.stopPropagation()
    setZoomLevel(1)
    setZoomedScreen(screen)
  }

  const handleZoomClose = () => {
    setZoomedScreen(null)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 3))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 1))
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
          ref={stageRef}
          className={`${styles.carouselStage} mt-16 sm:mt-20 ${isDragging ? styles.dragging : ""}`}
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
              <div
                key={screen.id}
                role="button"
                tabIndex={index === currentIndex ? 0 : -1}
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
                        <button
                          type="button"
                          className={styles.zoomButton}
                          onClick={(event) => handleZoomOpen(event, screen)}
                          onPointerDown={(event) => event.stopPropagation()}
                          onPointerUp={(event) => event.stopPropagation()}
                          aria-label={`Ampliar imagem de ${screen.title}`}
                        >
                          <ZoomIn className={styles.zoomIcon} />
                        </button>
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
              </div>
            ))}
          </div>
          {showFrontOverlay && activeScreen && (
            <div
              className={styles.activeOverlay}
              aria-hidden="true"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <div
                className={styles.activeCard}
                style={{ transform: `scale(${overlayScale})` }}
                onClick={() => handleCardClick(currentIndex)}
              >
                <div className="flex h-full flex-col p-5 sm:p-6">
                  <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.35em] text-emerald-200/70">
                    <span>{activeScreen.label}</span>
                    <span className="text-white/50">{activeScreen.category}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{activeScreen.title}</h3>
                  <div className={styles.activeFrame}>
                    <img
                      src={activeScreen.image}
                      alt={`Preview ${activeScreen.title}`}
                      className={styles.activeImage}
                    />
                    <button
                      type="button"
                      className={styles.zoomButton}
                      onClick={(event) => handleZoomOpen(event, activeScreen)}
                      onPointerDown={(event) => event.stopPropagation()}
                      onPointerUp={(event) => event.stopPropagation()}
                      aria-label={`Ampliar imagem de ${activeScreen.title}`}
                    >
                      <ZoomIn className={styles.zoomIcon} />
                    </button>
                  </div>
                  <p className="mt-4 text-sm text-white/70 leading-relaxed">{activeScreen.summary}</p>
                  <div className="mt-auto flex items-center gap-2 text-xs text-emerald-200/70">
                    <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
                    Clique para detalhes
                  </div>
                </div>
              </div>
            </div>
          )}
          {showBackOverlay && activeScreen && (
            <div
              className={styles.activeOverlay}
              aria-hidden="true"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
            >
              <div
                className={`${styles.activeCard} ${styles.activeCardBack}`}
                style={{ transform: `scale(${overlayScale})` }}
                onClick={() => handleCardClick(currentIndex)}
              >
                <div className="flex h-full flex-col p-5 sm:p-6">
                  <div className="text-[0.7rem] uppercase tracking-[0.35em] text-emerald-200/70">
                    {activeScreen.label}
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-white">{activeScreen.title}</h3>
                  <p className="mt-4 text-sm text-white/70 leading-relaxed">{activeScreen.description}</p>
                  <div className="mt-auto flex items-center justify-between text-xs text-white/60">
                    <span>Arraste para navegar</span>
                    <span className="text-emerald-300">Clique para voltar</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={`${styles.carouselControls} mt-8 flex items-center justify-center gap-4`}>
          <button
            type="button"
            onClick={handlePrev}
            className="h-11 w-11 cursor-pointer rounded-full border border-emerald-400/40 bg-black/40 text-emerald-200 transition hover:-translate-y-0.5 hover:bg-black/70"
            aria-label="Tela anterior"
          >
            <ChevronLeft className="h-5 w-5 mx-auto" />
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="h-11 w-11 cursor-pointer rounded-full border border-emerald-400/40 bg-black/40 text-emerald-200 transition hover:-translate-y-0.5 hover:bg-black/70"
            aria-label="Proxima tela"
          >
            <ChevronRight className="h-5 w-5 mx-auto" />
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-white/60">
          Use as setas ou arraste para navegar. Clique na tela ativa para virar.
        </p>
      </div>

      {zoomedScreen && (
        <div className={styles.zoomOverlay} onClick={handleZoomClose} role="dialog" aria-modal="true">
          <div className={styles.zoomPanel} onClick={(event) => event.stopPropagation()}>
            <div className={styles.zoomHeader}>
              <div className={styles.zoomTitle}>{zoomedScreen.title}</div>
              <button type="button" className={styles.zoomClose} onClick={handleZoomClose} aria-label="Fechar">
                <X className={styles.zoomIcon} />
              </button>
            </div>
            <div className={styles.zoomImageWrap}>
              <img
                src={zoomedScreen.image}
                alt={`Imagem ampliada de ${zoomedScreen.title}`}
                style={{ transform: `scale(${zoomLevel})` }}
                className={styles.zoomImage}
              />
            </div>
            <div className={styles.zoomControls}>
              <button type="button" onClick={handleZoomOut} className={styles.zoomControlButton}>
                <Minus className={styles.zoomIcon} />
              </button>
              <span className={styles.zoomLevel}>{Math.round(zoomLevel * 100)}%</span>
              <button type="button" onClick={handleZoomIn} className={styles.zoomControlButton}>
                <Plus className={styles.zoomIcon} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

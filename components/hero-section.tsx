"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import RotatingText from "./RotatingText"

const ArrowRight = () => (
  <svg
    className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const Play = () => (
  <svg
    className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m-6-8h8a2 2 0 012 2v8a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z"
    />
  </svg>
)


const trustedLogos = [
  {
    src: "/images/clientes/colegio-alternativo.png",
    alt: "Colegio Alternativo",
    className: "h-10 sm:h-11 md:h-14 w-auto object-contain",
    mobileClassName: "h-8 w-auto object-contain",
  },
  {
    src: "/images/clientes/hmx-logo.png",
    alt: "HMX",
    className: "h-14 sm:h-16 md:h-20 w-auto object-contain",
    mobileClassName: "h-12 w-auto object-contain",
  },
  {
    src: "/images/clientes/password.webp",
    alt: "Password",
    className: "h-6 sm:h-7 md:h-8 w-auto object-contain",
    mobileClassName: "h-5 w-auto object-contain",
  },
  {
    src: "/images/clientes/realizare-light.png",
    alt: "Realizare",
    className: "h-6 sm:h-7 md:h-8 w-auto object-contain",
    mobileClassName: "h-5 w-auto object-contain",
  },
  {
    src: "/images/clientes/tozi.webp",
    alt: "Tozi",
    className: "h-6 sm:h-7 md:h-8 w-auto object-contain mt-1",
    mobileClassName: "h-5 w-auto object-contain mt-1",
    wrapperClassName: "mt-1",
    mobileWrapperClassName: "mt-1",
  },
  {
    src: "/images/clientes/SIMPLEX%20BRANCA.svg",
    alt: "Simplex",
    className: "h-6 sm:h-7 md:h-8 w-auto object-contain",
    mobileClassName: "h-5 w-auto object-contain",
  },
]

export function HeroSection() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  useEffect(() => {
    if (!isDemoOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsDemoOpen(false)
      }
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isDemoOpen])

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 relative">
      <div className="max-w-4xl mx-auto text-center relative z-10 animate-fade-in-hero">
        {/* Badge */}
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 mt-12 animate-fade-in-badge">
          <span className="w-2 h-2 bg-white/60 rounded-full mr-2 animate-pulse"></span>
          Atendimento omnichannel
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-balance mb-6 animate-fade-in-heading">
          <span className="text-foreground">Eleve o seu</span>
          <br />
          <span className="inline-flex items-center justify-center flex-wrap gap-2 mt-4 sm:mt-6 md:mt-8">
            <span className="text-foreground">atendimento</span>
            <RotatingText
              texts={["experi\u00eancia", "agilidade", "qualidade", "efici\u00eancia", "controle"]}
              mainClassName="px-2 sm:px-2 md:px-3 bg-white text-black overflow-hidden py-1 sm:py-1 md:py-2 justify-center rounded-lg shadow-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-xl md:text-2xl text-white text-balance max-w-sm sm:max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4 sm:px-0 animate-fade-in-subheading font-light">
          O CHAT - SPX centraliza conversas do seu site, WhatsApp, e-mail e redes sociais em uma &uacute;nica caixa de entrada,
          com automa&ccedil;&otilde;es, IA e controle total dos dados.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 sm:mb-16 animate-fade-in-buttons">
          <Button
            asChild
            size="lg"
            className="bg-white text-black rounded-full px-8 py-4 text-lg font-medium transition-all duration-300 hover:bg-gray-50 hover:scale-105 hover:shadow-lg group cursor-pointer relative overflow-hidden"
          >
            <a href="#contact">
              Come&ccedil;ar agora
              <ArrowRight />
            </a>
          </Button>
          <Button
            variant="outline"
            size="lg"
            type="button"
            onClick={() => setIsDemoOpen(true)}
            className="rounded-full px-8 py-4 text-lg font-medium border-border hover:bg-accent transition-all duration-200 hover:scale-105 group bg-transparent cursor-pointer"
          >
            <Play />
            Ver demonstra&ccedil;&atilde;o
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="text-center px-4 hidden sm:block overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6">Confiado por equipes inovadoras no mundo todo</p>
          <div className="relative overflow-hidden w-full max-w-4xl mx-auto">
            <div className="flex items-center gap-8 opacity-60 hover:opacity-80 transition-all duration-500 animate-slide-left">
              <div className="flex items-center gap-8 whitespace-nowrap shrink-0 min-w-max">
                {trustedLogos.map((logo) => (
                  <div key={logo.src} className={`shrink-0 ${logo.wrapperClassName || ""}`.trim()}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={48}
                      className={logo.className}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-8 whitespace-nowrap shrink-0 min-w-max">
                {trustedLogos.map((logo) => (
                  <div key={`${logo.src}-dup`} className={`shrink-0 ${logo.wrapperClassName || ""}`.trim()}>
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={160}
                      height={48}
                      className={logo.className}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Trust Indicators */}
        <div className="text-center px-4 mb-8 sm:hidden overflow-hidden animate-fade-in-trust">
          <p className="text-sm text-white mb-6">Confiado por equipes inovadoras no mundo todo</p>
          <div className="relative overflow-hidden w-full max-w-sm mx-auto">
            {/* Left blur fade */}
            <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
            {/* Right blur fade */}
            <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>
            <div className="flex items-center gap-6 opacity-60 animate-slide-left-mobile">
              <div className="flex items-center gap-6 whitespace-nowrap shrink-0 min-w-max">
                {trustedLogos.map((logo) => (
                  <div
                    key={`${logo.src}-mobile`}
                    className={`shrink-0 ${logo.mobileWrapperClassName || logo.wrapperClassName || ""}`.trim()}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={140}
                      height={40}
                      className={logo.mobileClassName}
                    />
                  </div>
                ))}
              </div>
              {/* Duplicate for seamless loop */}
              <div className="flex items-center gap-6 whitespace-nowrap shrink-0 min-w-max">
                {trustedLogos.map((logo) => (
                  <div
                    key={`${logo.src}-mobile-dup`}
                    className={`shrink-0 ${logo.mobileWrapperClassName || logo.wrapperClassName || ""}`.trim()}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={140}
                      height={40}
                      className={logo.mobileClassName}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {isDemoOpen && (
        <div
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Demonstra&ccedil;&atilde;o imersiva"
        >
          <div className="absolute inset-0 bg-black"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950/80 to-black"></div>
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl animate-float-slow"></div>
          <div className="absolute -bottom-48 -left-48 h-[28rem] w-[28rem] rounded-full bg-sky-500/10 blur-3xl animate-float-medium"></div>
          <div
            className="relative z-10 flex h-full w-full items-center justify-center px-4 py-10"
            onClick={() => setIsDemoOpen(false)}
          >
            <div
              className="w-full max-w-5xl animate-fade-in"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex justify-center">
                <div className="inline-flex overflow-hidden rounded-[1.75rem] border border-white/10 shadow-[0_0_90px_rgba(16,185,129,0.25)]">
                  <video
                    className="block max-h-[78vh] w-auto max-w-[90vw] object-contain"
                    src="/demonstracao.mp4"
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                  >
                    Seu navegador n&atilde;o suporta o v&iacute;deo.
                  </video>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center justify-between gap-4 text-white/70 sm:flex-row">
                <div className="text-xs uppercase tracking-[0.35em] text-white/50">
                  Demonstra&ccedil;&atilde;o imersiva
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-white/60">
                  <span>Pressione Esc para fechar</span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDemoOpen(false)}
                    className="rounded-full px-6 cursor-pointer w-full sm:w-auto"
                  >
                    Fechar demonstra&ccedil;&atilde;o
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}</section>
  )
}










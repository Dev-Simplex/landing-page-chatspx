"use client"

import { useEffect, useState, type ReactNode } from "react"
import { APP } from "@/lib/app-download"

type Sistema = "ios" | "android" | null

// Marcas: Simple Icons (CC0)
const AppleLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
  </svg>
)

const AndroidLogo = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
  </svg>
)

function detectarSistema(): Sistema {
  const ua = navigator.userAgent
  if (/android/i.test(ua)) return "android"
  // iPadOS se apresenta como Mac: o toque denuncia
  if (/iphone|ipad|ipod/i.test(ua) || (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1)) return "ios"
  return null
}

function BotaoLoja({
  href,
  destaque,
  logo,
  linha1,
  linha2,
}: {
  href: string
  destaque: boolean
  logo: ReactNode
  linha1: string
  linha2: string
}) {
  return (
    <a
      href={href}
      className={`group relative flex h-[4.25rem] w-full items-center gap-4 rounded-2xl px-5 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2dc46f] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
        destaque
          ? "bg-gradient-to-b from-[#3fe08e] to-[#1ea85a] text-black shadow-[0_18px_50px_-12px_rgba(45,196,111,0.75)] hover:shadow-[0_22px_60px_-10px_rgba(45,196,111,0.9)]"
          : "border border-white/15 bg-white/[0.04] text-white backdrop-blur-md hover:border-white/30 hover:bg-white/[0.08]"
      }`}
    >
      {logo}
      <span className="flex flex-col text-left leading-tight">
        <span className={`text-xs ${destaque ? "text-black/70" : "text-white/60"}`}>{linha1}</span>
        <span className="text-xl font-semibold tracking-tight">{linha2}</span>
      </span>
    </a>
  )
}

function Recomendado({ ativo }: { ativo: boolean }) {
  return (
    <p
      className={`mb-2 h-5 text-xs font-medium text-[#5ff0a3] transition-opacity duration-500 ${
        ativo ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!ativo}
    >
      ✓ Recomendado para o seu celular
    </p>
  )
}

export function DownloadButtons() {
  const [sistema, setSistema] = useState<Sistema>(null)

  useEffect(() => setSistema(detectarSistema()), [])

  return (
    <div className="grid w-full gap-4 sm:grid-cols-2 sm:gap-5">
      <div className={sistema === "android" ? "order-2 sm:order-none" : ""}>
        <Recomendado ativo={sistema === "ios"} />
        <BotaoLoja
          href={APP.appStore}
          destaque={sistema === "ios"}
          logo={<AppleLogo className="size-8 shrink-0" />}
          linha1="Baixar na"
          linha2="App Store"
        />
      </div>

      <div className={sistema === "android" ? "order-1 sm:order-none" : ""}>
        <Recomendado ativo={sistema === "android"} />
        {/* /baixar/android leva ao APK ou, com playLiberada, à Google Play */}
        <BotaoLoja
          href="/baixar/android"
          destaque={sistema === "android"}
          logo={<AndroidLogo className="size-8 shrink-0" />}
          linha1={APP.playLiberada ? "Disponível no" : "Baixar para"}
          linha2={APP.playLiberada ? "Google Play" : "Android"}
        />
        {/* Enquanto a Play não publica o app, o Android mostra uma tela do Play
            Protect no meio da instalação. Quem não for avisado ANTES desiste ali
            — por isso o aviso fica junto do botão, e não só nas perguntas. */}
        {!APP.playLiberada && (
          <p className="mt-3 text-xs leading-relaxed text-white/60">
            O Android vai pedir para permitir a instalação e pode mostrar um aviso do Play Protect — o app está em
            análise na Google Play.{" "}
            <a href="#perguntas" className="text-[#5ff0a3] underline underline-offset-2">
              Veja como instalar
            </a>
            .
          </p>
        )}
      </div>
    </div>
  )
}

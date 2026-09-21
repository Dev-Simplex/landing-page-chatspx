import type { CSSProperties, ReactNode } from "react"
import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Plus } from "lucide-react"
import Aurora from "@/components/Aurora"
import { DownloadButtons } from "@/components/download-buttons"
import { APP } from "@/lib/app-download"
import { ICONES_3D, TINGIMENTO_3D, type Nome3D } from "@/data/icones3d"
import "./baixar.css"

const titulo = "Baixe o app | CHAT - SPX"
const descricao =
  "Baixe o Chat SPX para iPhone e Android e responda seus clientes de onde estiver, com todos os canais na palma da mão."

export const metadata: Metadata = {
  metadataBase: new URL("https://chatspx.com.br"),
  title: titulo,
  description: descricao,
  // Smart App Banner do Safari no iPhone
  itunes: { appId: APP.appStoreId },
  openGraph: {
    title: titulo,
    description: descricao,
    url: "/baixar",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/app/og-baixar.jpg", width: 1200, height: 630, alt: "App Chat SPX no celular" }],
  },
  twitter: {
    card: "summary_large_image",
    title: titulo,
    description: descricao,
    images: ["/app/og-baixar.jpg"],
  },
}

const WHATSAPP = "https://wa.me/556696571379"

const foco =
  "rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2dc46f] focus-visible:ring-offset-2 focus-visible:ring-offset-black"

function Icone3D({
  nome,
  tamanho,
  className,
  style,
}: {
  nome: Nome3D
  tamanho: number
  className?: string
  style?: CSSProperties
}) {
  return (
    <Image
      src={ICONES_3D[nome]}
      width={tamanho}
      height={tamanho}
      alt=""
      aria-hidden
      className={className}
      style={{ filter: TINGIMENTO_3D, ...style }}
    />
  )
}

const RECURSOS: { icone: Nome3D; titulo: string; texto: string }[] = [
  {
    icone: "conversa",
    titulo: "Responda de qualquer lugar",
    texto: "WhatsApp, Instagram, e-mail e os outros canais na mesma caixa de entrada.",
  },
  {
    icone: "notificacao",
    titulo: "Aviso na hora",
    texto: "Notificação a cada mensagem nova, para nenhum cliente ficar esperando.",
  },
  {
    icone: "painel",
    titulo: "Painel no bolso",
    texto: "Conversas abertas, pendentes e tempo de resposta da equipe em tempo real.",
  },
  {
    icone: "seguranca",
    titulo: "Oficial e seguro",
    texto: "Entre com o acesso da sua empresa. App assinado e publicado pela Simplex.",
  },
]

const PERGUNTAS: { pergunta: string; resposta: ReactNode }[] = [
  {
    pergunta: "Preciso de uma conta para usar o app?",
    resposta: (
      <>
        Sim. O app usa o mesmo acesso do Chat SPX: é só entrar com o usuário que você já usa no computador. Se ainda
        não tem acesso, peça ao administrador da sua empresa ou{" "}
        <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className={`text-[#5ff0a3] underline underline-offset-4 ${foco}`}>
          fale com a nossa equipe
        </a>
        .
      </>
    ),
  },
  ...(APP.playLiberada
    ? []
    : [
        {
          pergunta: "Por que no Android o download é um arquivo?",
          resposta: (
            <>
              O app está em análise na Google Play. Enquanto isso, você instala pelo arquivo oficial (APK), que é o
              mesmo pacote assinado que enviamos à loja. Assim que o app for publicado, o botão passa a abrir a Google
              Play.
            </>
          ),
        },
        {
          pergunta: 'Apareceu "Faça o download deste app no Google Play". E agora?',
          resposta: (
            <>
              É o Play Protect. Como o Chat SPX já está cadastrado na Google Play mas ainda não foi publicado, o
              celular estranha receber o app por fora da loja. O arquivo é o mesmo que enviamos à Google. Para
              instalar mesmo assim: abra a <strong>Play Store</strong>, toque na sua foto, vá em{" "}
              <strong>Play Protect</strong>, abra a engrenagem e desligue{" "}
              <strong>Analisar apps com o Play Protect</strong>. Instale o arquivo e ligue a opção de volta. Assim que
              o app for publicado, esse aviso deixa de aparecer.
            </>
          ),
        },
        {
          pergunta: "É seguro instalar o APK?",
          resposta: (
            <>
              Sim, desde que você baixe por esta página. O aviso do Android ou do Play Protect é normal para qualquer
              app instalado por arquivo. Se quiser conferir a integridade do arquivo:
              <code className="mt-3 block break-all rounded-lg border border-white/10 bg-black/40 px-3 py-2 font-mono text-xs text-white/75">
                SHA-256: {APP.apkSha256}
              </code>
            </>
          ),
        },
      ]),
  {
    pergunta: "Quais celulares são compatíveis?",
    resposta: (
      <>
        iPhone com iOS {APP.iosMinimo} ou mais recente e celulares com Android {APP.androidMinimo} ou mais recente.
      </>
    ),
  },
  {
    pergunta: "Como atualizo o app?",
    resposta: APP.playLiberada ? (
      <>A App Store e a Google Play atualizam o app sozinhas. Suas conversas ficam salvas no Chat SPX.</>
    ) : (
      <>
        No iPhone, a App Store atualiza o app sozinha. No Android, baixe a versão nova nesta página e instale por
        cima da atual: suas conversas ficam salvas no Chat SPX.
      </>
    ),
  },
]

export default function BaixarPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-black text-white">
      {/* Fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[90vh] overflow-hidden opacity-50 [mask-image:linear-gradient(to_bottom,black_45%,transparent)] motion-reduce:hidden"
      >
        <Aurora colorStops={["#2dc46f", "#1b8a4c", "#2dc46f"]} amplitude={1} blend={0.5} speed={0.6} />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[60rem] bg-[radial-gradient(60%_50%_at_70%_25%,rgba(45,196,111,0.16),transparent_70%)]"
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <Link href="/" className={`flex items-center gap-2.5 text-lg font-semibold tracking-tight ${foco}`}>
          <Image src="/app/logo-3d.webp" alt="" width={36} height={36} priority />
          Chat SPX
        </Link>
        <Link href="/" className={`text-sm text-white/70 transition-colors hover:text-white ${foco}`}>
          Conhecer a plataforma <span aria-hidden>→</span>
        </Link>
      </header>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid max-w-6xl items-center gap-8 px-5 pb-20 pt-4 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:pb-28 lg:pt-10">
        <div className="text-center lg:text-left">
          <p
            className="baixar-rise inline-flex items-center gap-2 rounded-full border border-[#2dc46f]/30 bg-[#2dc46f]/10 px-3.5 py-1.5 text-xs font-medium text-[#8ff5bd]"
            style={{ animationDelay: "100ms" }}
          >
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#2dc46f] opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex size-2 rounded-full bg-[#2dc46f]" />
            </span>
            App oficial · versão {APP.versao}
          </p>
          <h1
            className="baixar-rise mt-6 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ animationDelay: "180ms" }}
          >
            Seu atendimento{" "}
            <span className="whitespace-nowrap bg-gradient-to-r from-[#7ff5b5] to-[#2dc46f] bg-clip-text text-transparent">no bolso.</span>
          </h1>
          <p
            className="baixar-rise mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70 lg:mx-0"
            style={{ animationDelay: "260ms" }}
          >
            Baixe o Chat SPX no celular e responda seus clientes de onde estiver: conversas de todos os canais, aviso na
            hora de mensagem nova e o painel da equipe na palma da mão.
          </p>
          <div className="baixar-rise mt-8" style={{ animationDelay: "340ms" }}>
            <DownloadButtons />
          </div>
          <div
            className="baixar-rise mt-6 hidden items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md lg:flex"
            style={{ animationDelay: "420ms" }}
          >
            <div className="shrink-0 rounded-xl bg-white p-2">
              <Image src="/app/qr-baixar.svg" alt="QR code para baixar o app Chat SPX" width={96} height={96} />
            </div>
            <p className="text-sm leading-relaxed text-white/70">
              <strong className="block font-medium text-white">Está no computador?</strong>
              Aponte a câmera do celular para o código e baixe direto no aparelho.
            </p>
          </div>
        </div>

        {/* Palco da logo */}
        <div className="relative order-first mx-auto aspect-square w-60 sm:w-80 lg:order-none lg:w-[30rem]">
          <div aria-hidden className="baixar-glow absolute inset-[14%] rounded-full bg-[#2dc46f]/45 blur-3xl" />
          <div aria-hidden className="absolute inset-[6%] rounded-full border border-white/10" />
          <div aria-hidden className="baixar-spin absolute inset-0 rounded-full border border-dashed border-[#2dc46f]/35" />
          <div className="baixar-float absolute inset-[15%]">
            <Image
              src="/app/logo-3d.webp"
              alt="Logo do Chat SPX"
              fill
              priority
              sizes="(min-width: 1024px) 21rem, (min-width: 640px) 14rem, 10.5rem"
              className="object-contain drop-shadow-[0_24px_48px_rgba(45,196,111,0.45)]"
            />
          </div>
          <Icone3D
            nome="notificacao"
            tamanho={128}
            className="baixar-float absolute right-[2%] top-[4%] h-auto w-[23%]"
            style={{ animationDelay: "-2.5s" }}
          />
          <Icone3D
            nome="conversa"
            tamanho={128}
            className="baixar-float absolute bottom-[6%] left-0 h-auto w-[25%]"
            style={{ animationDelay: "-5s" }}
          />
        </div>
      </section>

      {/* Por dentro do app */}
      <section className="relative z-10 mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2dc46f]">Por dentro do app</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Tudo o que importa no atendimento, na palma da mão
          </h2>
        </div>

        <div className="relative mx-auto mt-12 flex max-w-4xl items-start justify-center [mask-image:linear-gradient(to_bottom,black_65%,transparent)] lg:mt-16">
          <div aria-hidden className="absolute inset-x-[20%] top-[15%] h-2/3 rounded-full bg-[#2dc46f]/25 blur-3xl" />
          <Image
            src="/app/print-2.webp"
            alt="Painel do app com métricas de atendimento da equipe"
            width={600}
            height={1123}
            sizes="(min-width: 896px) 270px, 30vw"
            className="relative -mr-[6%] mt-[12%] w-[30%] -rotate-6 opacity-80"
          />
          <Image
            src="/app/print-1.webp"
            alt="Lista de conversas do app com mensagens de vários canais"
            width={600}
            height={1123}
            sizes="(min-width: 896px) 342px, 38vw"
            className="relative z-10 w-[38%]"
          />
          <Image
            src="/app/print-3.webp"
            alt="Conversa aberta no app com um cliente"
            width={600}
            height={1123}
            sizes="(min-width: 896px) 270px, 30vw"
            className="relative -ml-[6%] mt-[12%] w-[30%] rotate-6 opacity-80"
          />
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {RECURSOS.map((r) => (
            <li key={r.icone} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm">
              <Icone3D nome={r.icone} tamanho={64} />
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{r.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{r.texto}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <h2 className="text-center text-3xl font-semibold tracking-tight sm:text-4xl">Perguntas frequentes</h2>
        <div className="mt-10 divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/[0.03]">
          {PERGUNTAS.map(({ pergunta, resposta }) => (
            <details key={pergunta} className="group px-5 sm:px-6">
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-medium [&::-webkit-details-marker]:hidden ${foco}`}
              >
                {pergunta}
                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-[#2dc46f] transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                />
              </summary>
              <div className="pb-5 leading-relaxed text-white/70">{resposta}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-20 pt-8 sm:px-8 lg:pb-28">
        <div className="rounded-3xl border border-[#2dc46f]/20 bg-gradient-to-b from-[#2dc46f]/10 to-transparent px-6 py-12 text-center sm:px-12">
          {/* mesmo arquivo do palco: sem priority aqui o Next acusa LCP sem priority em dev */}
          <Image src="/app/logo-3d.webp" alt="" width={72} height={72} priority className="baixar-float mx-auto" />
          <h2 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">Pronto para atender de qualquer lugar?</h2>
          <div className="mx-auto mt-8 max-w-xl text-left">
            <DownloadButtons />
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-8 text-sm text-white/55 sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} CHAT - SPX</p>
          <nav aria-label="Links do rodapé" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <Link href="/politica-de-privacidade" className={`hover:text-white ${foco}`}>
              Política de privacidade
            </Link>
            <Link href="/termos-de-servico" className={`hover:text-white ${foco}`}>
              Termos de uso
            </Link>
            <a href="https://woopicx.com" target="_blank" rel="noopener" className={`hover:text-white ${foco}`}>
              Ícones 3D: Images by Woopicx.com
            </a>
          </nav>
        </div>
      </footer>
    </main>
  )
}

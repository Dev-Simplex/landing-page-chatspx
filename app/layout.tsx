import type React from "react"
import type { Metadata } from "next"
import { Suspense } from "react"
import "./globals.css"
import { PageTransition } from "@/components/page-transition"
import { NavigationTransition } from "@/components/navigation-transition"
import { SiteLoader } from "@/components/site-loader"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Dancing_Script, Caveat } from "next/font/google"
import Script from "next/script"

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing-script",
  display: "swap",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
})

export const metadata: Metadata = {
  title: "CHAT - SPX | Plataforma de atendimento ao cliente",
  description:
    "CHAT - SPX é a plataforma moderna e auto-hospedada de atendimento omnichannel, com caixa de entrada unificada, automações e IA.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/logo_thumbnail.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/logo_thumbnail.svg",
    apple: "/logo_thumbnail.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans antialiased ${dancingScript.variable} ${caveat.variable}`}>
        <SiteLoader />
        <Suspense fallback={null}>
          <NavigationTransition />
          <PageTransition>{children}</PageTransition>
        </Suspense>
        <Script id="chatwoot-widget" strategy="afterInteractive">
          {`window.chatwootSettings={"position":"right","type":"standard","launcherTitle":"Fale conosco no chat"};
(function(d,t){var BASE_URL="https://chat.simplexsolucoes.com.br";var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
g.src=BASE_URL+"/packs/js/sdk.js";g.async=true;s.parentNode.insertBefore(g,s);g.onload=function(){window.chatwootSDK.run({websiteToken:"6dPgMBcE9W69x7hHgXQnwuPN",baseUrl:BASE_URL})}})(document,"script");`}
        </Script>
        <SpeedInsights />
      </body>
    </html>
  )
}

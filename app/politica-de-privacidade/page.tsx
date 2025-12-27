import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Politica de Privacidade | CHAT - SPX",
  description: "Politica de privacidade da plataforma CHAT - SPX.",
}

export default function PoliticaDePrivacidadePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto w-full max-w-4xl px-6 py-16 md:py-24">
        <div className="space-y-10">
          <header className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="mr-2 size-4" />
              Voltar
            </Link>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Legal</p>
            <h1 className="text-3xl font-semibold sm:text-4xl">Politica de Privacidade</h1>
            <p className="text-base text-muted-foreground">
              Esta politica descreve como o CHAT - SPX coleta, utiliza e protege dados pessoais.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Dados que coletamos</h2>
            <p className="text-muted-foreground">
              Podemos coletar dados de cadastro, dados de uso da plataforma, informacoes tecnicas do dispositivo e
              mensagens enviadas nos canais integrados.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Como usamos os dados</h2>
            <p className="text-muted-foreground">
              Utilizamos os dados para operar o servico, melhorar a experiencia, prestar suporte, garantir seguranca e
              cumprir obrigacoes legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Compartilhamento</h2>
            <p className="text-muted-foreground">
              Podemos compartilhar dados com fornecedores que nos ajudam a operar a plataforma, sempre com medidas de
              protecao adequadas e conforme a legislacao aplicavel.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Retencao</h2>
            <p className="text-muted-foreground">
              Mantemos os dados apenas pelo tempo necessario para cumprir as finalidades descritas nesta politica ou
              exigencias legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Seguranca</h2>
            <p className="text-muted-foreground">
              Adotamos medidas tecnicas e organizacionais para proteger os dados. Ainda assim, nenhum sistema e
              totalmente isento de riscos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Seus direitos</h2>
            <p className="text-muted-foreground">
              Voce pode solicitar acesso, correcao ou exclusao dos seus dados, conforme a LGPD e demais normas
              aplicaveis.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Cookies</h2>
            <p className="text-muted-foreground">
              Podemos usar cookies e tecnologias semelhantes para melhorar a navegacao e medir desempenho.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Contato</h2>
            <p className="text-muted-foreground">
              Para duvidas sobre esta politica, utilize a Central de Ajuda ou outros canais oficiais de atendimento.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

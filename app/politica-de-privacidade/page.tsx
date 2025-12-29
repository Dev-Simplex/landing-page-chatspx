import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Pol\u00edtica de Privacidade | CHAT - SPX",
  description: "Pol\u00edtica de privacidade da plataforma CHAT - SPX.",
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
            <h1 className="text-3xl font-semibold sm:text-4xl">Pol&iacute;tica de Privacidade</h1>
            <p className="text-base text-muted-foreground">
              Esta pol&iacute;tica descreve como o CHAT - SPX coleta, utiliza e protege dados pessoais.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Dados que coletamos</h2>
            <p className="text-muted-foreground">
              Podemos coletar dados de cadastro, dados de uso da plataforma, informa&ccedil;&otilde;es t&eacute;cnicas do
              dispositivo e mensagens enviadas nos canais integrados.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Como usamos os dados</h2>
            <p className="text-muted-foreground">
              Utilizamos os dados para operar o servi&ccedil;o, melhorar a experi&ecirc;ncia, prestar suporte, garantir
              seguran&ccedil;a e cumprir obriga&ccedil;&otilde;es legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Compartilhamento</h2>
            <p className="text-muted-foreground">
              Podemos compartilhar dados com fornecedores que nos ajudam a operar a plataforma, sempre com medidas de
              prote&ccedil;&atilde;o adequadas e conforme a legisla&ccedil;&atilde;o aplic&aacute;vel.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Reten&ccedil;&atilde;o</h2>
            <p className="text-muted-foreground">
              Mantemos os dados apenas pelo tempo necess&aacute;rio para cumprir as finalidades descritas nesta pol&iacute;tica
              ou exig&ecirc;ncias legais.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Seguran&ccedil;a</h2>
            <p className="text-muted-foreground">
              Adotamos medidas t&eacute;cnicas e organizacionais para proteger os dados. Ainda assim, nenhum sistema &eacute;
              totalmente isento de riscos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Seus direitos</h2>
            <p className="text-muted-foreground">
              Voc&ecirc; pode solicitar acesso, corre&ccedil;&atilde;o ou exclus&atilde;o dos seus dados, conforme a LGPD e demais
              normas aplic&aacute;veis.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Cookies</h2>
            <p className="text-muted-foreground">
              Podemos usar cookies e tecnologias semelhantes para melhorar a navega&ccedil;&atilde;o e medir desempenho.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Contato</h2>
            <p className="text-muted-foreground">
              Para d&uacute;vidas sobre esta pol&iacute;tica, utilize a Central de Ajuda ou outros canais oficiais de
              atendimento.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

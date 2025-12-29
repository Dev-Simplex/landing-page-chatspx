import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Termos de Servi\u00e7o | CHAT - SPX",
  description: "Termos de servi\u00e7o da plataforma CHAT - SPX.",
}

export default function TermosDeServicoPage() {
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
            <h1 className="text-3xl font-semibold sm:text-4xl">Termos de Servi&ccedil;o</h1>
            <p className="text-base text-muted-foreground">
              Ao acessar ou usar o CHAT - SPX, voc&ecirc; concorda com estes termos. Leia com aten&ccedil;&atilde;o.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Aceita&ccedil;&atilde;o</h2>
            <p className="text-muted-foreground">
              Estes termos regulam o uso da plataforma CHAT - SPX. Se voc&ecirc; n&atilde;o concorda, n&atilde;o utilize o
              servi&ccedil;o.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Uso do servi&ccedil;o</h2>
            <p className="text-muted-foreground">
              Voc&ecirc; deve usar o CHAT - SPX de forma legal e em conformidade com as pol&iacute;ticas aplic&aacute;veis. &Eacute;
              proibido utilizar o servi&ccedil;o para atividades il&iacute;citas, viola&ccedil;&otilde;es de direitos de
              terceiros ou envio de conte&uacute;do malicioso.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Contas e seguran&ccedil;a</h2>
            <p className="text-muted-foreground">
              Voc&ecirc; &eacute; respons&aacute;vel por manter a confidencialidade das credenciais de acesso e por toda atividade
              realizada em sua conta.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Conte&uacute;do e dados</h2>
            <p className="text-muted-foreground">
              O conte&uacute;do enviado por voc&ecirc; permanece de sua responsabilidade. O CHAT - SPX pode processar dados para
              viabilizar o funcionamento do servi&ccedil;o, conforme descrito na Pol&iacute;tica de Privacidade.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Disponibilidade e suporte</h2>
            <p className="text-muted-foreground">
              Empregamos esfor&ccedil;os razo&aacute;veis para manter o servi&ccedil;o dispon&iacute;vel, mas podem ocorrer
              interrup&ccedil;&otilde;es para manuten&ccedil;&atilde;o ou por fatores externos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Planos e cobran&ccedil;a</h2>
            <p className="text-muted-foreground">
              Quando aplic&aacute;vel, planos, limites e condi&ccedil;&otilde;es comerciais ser&atilde;o apresentados de forma
              transparente durante a contrata&ccedil;&atilde;o.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Propriedade intelectual</h2>
            <p className="text-muted-foreground">
              O CHAT - SPX e seus materiais s&atilde;o protegidos por leis de propriedade intelectual. Nenhuma parte do
              servi&ccedil;o pode ser copiada ou distribu&iacute;da sem autoriza&ccedil;&atilde;o.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Limita&ccedil;&atilde;o de responsabilidade</h2>
            <p className="text-muted-foreground">
              Na extens&atilde;o permitida pela lei, n&atilde;o nos responsabilizamos por perdas indiretas ou lucros
              cessantes decorrentes do uso do servi&ccedil;o.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Encerramento</h2>
            <p className="text-muted-foreground">
              Voc&ecirc; pode encerrar o uso a qualquer momento. Podemos suspender ou encerrar o acesso em caso de
              viola&ccedil;&atilde;o destes termos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Contato</h2>
            <p className="text-muted-foreground">
              Em caso de d&uacute;vidas, utilize a Central de Ajuda ou outros canais oficiais de atendimento.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

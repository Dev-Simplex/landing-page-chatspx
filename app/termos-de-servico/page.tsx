import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Termos de Servico | CHAT - SPX",
  description: "Termos de servico da plataforma CHAT - SPX.",
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
            <h1 className="text-3xl font-semibold sm:text-4xl">Termos de Servico</h1>
            <p className="text-base text-muted-foreground">
              Ao acessar ou usar o CHAT - SPX, voce concorda com estes termos. Leia com atencao.
            </p>
          </header>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">1. Aceitacao</h2>
            <p className="text-muted-foreground">
              Estes termos regulam o uso da plataforma CHAT - SPX. Se voce nao concorda, nao utilize o servico.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">2. Uso do servico</h2>
            <p className="text-muted-foreground">
              Voce deve usar o CHAT - SPX de forma legal e em conformidade com as politicas aplicaveis. E proibido
              utilizar o servico para atividades ilicitas, violacoes de direitos de terceiros ou envio de conteudo
              malicioso.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">3. Contas e seguranca</h2>
            <p className="text-muted-foreground">
              Voce e responsavel por manter a confidencialidade das credenciais de acesso e por toda atividade realizada
              em sua conta.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">4. Conteudo e dados</h2>
            <p className="text-muted-foreground">
              O conteudo enviado por voce permanece de sua responsabilidade. O CHAT - SPX pode processar dados para
              viabilizar o funcionamento do servico, conforme descrito na Politica de Privacidade.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">5. Disponibilidade e suporte</h2>
            <p className="text-muted-foreground">
              Empregamos esforcos razoaveis para manter o servico disponivel, mas podem ocorrer interrupcoes para
              manutencao ou por fatores externos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">6. Planos e cobranca</h2>
            <p className="text-muted-foreground">
              Quando aplicavel, planos, limites e condicoes comerciais serao apresentados de forma transparente durante a
              contratacao.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">7. Propriedade intelectual</h2>
            <p className="text-muted-foreground">
              O CHAT - SPX e seus materiais sao protegidos por leis de propriedade intelectual. Nenhuma parte do servico
              pode ser copiada ou distribuida sem autorizacao.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">8. Limitacao de responsabilidade</h2>
            <p className="text-muted-foreground">
              Na extensao permitida pela lei, nao nos responsabilizamos por perdas indiretas ou lucros cessantes
              decorrentes do uso do servico.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">9. Encerramento</h2>
            <p className="text-muted-foreground">
              Voce pode encerrar o uso a qualquer momento. Podemos suspender ou encerrar o acesso em caso de violacao
              destes termos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-xl font-semibold">10. Contato</h2>
            <p className="text-muted-foreground">
              Em caso de duvidas, utilize a Central de Ajuda ou outros canais oficiais de atendimento.
            </p>
          </section>
        </div>
      </section>
    </main>
  )
}

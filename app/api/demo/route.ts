import { NextResponse } from "next/server"

type DemoRequest = {
  name: string
  company: string
  whatsapp: string
  volume?: string
  message?: string
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const parseFromField = (value: string) => {
  const match = value.match(/^(.*)<(.+)>$/)
  if (match) {
    return {
      name: match[1].trim().replace(/^"(.+)"$/, "$1") || undefined,
      email: match[2].trim(),
    }
  }

  return { name: undefined, email: value.trim() }
}

const parseRecipients = (value: string) =>
  value
    .split(/[;,]/g)
    .map((item) => item.trim())
    .filter(Boolean)

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<DemoRequest>
    const name = body.name?.trim()
    const company = body.company?.trim()
    const whatsapp = body.whatsapp?.trim()
    const volume = body.volume?.trim()
    const message = body.message?.trim()

    if (!name || !company || !whatsapp) {
      return NextResponse.json(
        { error: "Campos obrigatorios: nome, empresa e WhatsApp." },
        { status: 400 },
      )
    }

    const host = process.env.SMTP_ADDRESS || process.env.SMTP_HOST
    const user = process.env.SMTP_USERNAME || process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS
    const from = process.env.SMTP_FROM
    const to = process.env.SMTP_TO
    const smtpName = process.env.SMTP_DOMAIN
    const apiUrl = process.env.MAILGRID_API_URL || "https://api.mailgrid.net.br/sendmail/"
    const apiToken = process.env.MAILGRID_API_TOKEN

    if (!host || !user || !pass || !from || !to) {
      return NextResponse.json({ error: "Servidor nao configurado." }, { status: 500 })
    }

    const subject = `Nova solicitacao de demonstracao - ${company}`
    const text = [
      "Nova solicitacao de demonstracao",
      "",
      `Nome: ${name}`,
      `Empresa: ${company}`,
      `WhatsApp: ${whatsapp}`,
      `Volume mensal: ${volume || "-"}`,
      `Mensagem: ${message || "-"}`,
    ].join("\n")
    const html = `
      <h2>Nova solicitacao de demonstracao</h2>
      <p><strong>Nome:</strong> ${escapeHtml(name)}</p>
      <p><strong>Empresa:</strong> ${escapeHtml(company)}</p>
      <p><strong>WhatsApp:</strong> ${escapeHtml(whatsapp)}</p>
      <p><strong>Volume mensal:</strong> ${escapeHtml(volume || "-")}</p>
      <p><strong>Mensagem:</strong> ${escapeHtml(message || "-")}</p>
    `

    const { email: fromEmail, name: fromName } = parseFromField(from)
    const recipients = parseRecipients(to)

    if (!fromEmail || recipients.length === 0) {
      return NextResponse.json({ error: "Servidor nao configurado." }, { status: 500 })
    }

    const payload = {
      host_smtp: host,
      usuario_smtp: user,
      senha_smtp: pass,
      emailRemetente: fromEmail,
      nomeRemetente: fromName || smtpName || undefined,
      emailDestino: recipients,
      assunto: subject,
      mensagem: html,
      mensagemAlt: text,
      mensagemTipo: "html",
      mensagemEncoding: "quoted-printable",
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    }

    if (apiToken) {
      headers.Authorization = `Bearer ${apiToken}`
      headers["X-API-KEY"] = apiToken
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      })
      const rawText = await response.text()
      let data: unknown = rawText

      try {
        data = rawText ? JSON.parse(rawText) : null
      } catch {
        data = rawText
      }

      const isSuccess =
        Array.isArray(data) &&
        data.length > 0 &&
        (data[0]?.codigo === "200" ||
          (typeof data[0]?.status === "string" &&
            data[0].status.toLowerCase().includes("enviada")))

      if (!response.ok || !isSuccess) {
        console.error("Mailgrid API error:", data)
        return NextResponse.json({ error: "Erro ao enviar e-mail." }, { status: 500 })
      }
    } catch (error) {
      console.error("Mailgrid API error:", error)
      const message = error instanceof Error ? error.message : "Erro ao enviar e-mail."
      return NextResponse.json({ error: message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: "Erro ao processar o pedido." }, { status: 500 })
  }
}

"use client"

import { useEffect, useRef, useState } from "react"
import type { ChangeEvent, FormEvent } from "react"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element")
            elements.forEach((element, index) => {
              setTimeout(() => {
                element.classList.add("animate-fade-in-up")
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    whatsapp: "",
    volume: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    const nextValue = name === "whatsapp" ? value.replace(/\D/g, "") : value
    setFormData((prev) => ({ ...prev, [name]: nextValue }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (status === "sending") return
    setStatus("sending")
    setErrorMessage("")

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        setErrorMessage(data.error || "Nao foi possivel enviar. Tente novamente.")
        setStatus("error")
        return
      }

      setStatus("success")
      setFormData({ name: "", company: "", whatsapp: "", volume: "", message: "" })
    } catch (error) {
      setErrorMessage("Nao foi possivel enviar. Tente novamente.")
      setStatus("error")
    }
  }

  return (
    <section id="contact" ref={sectionRef} className="relative py-8 px-4 sm:px-6 lg:px-8 mb-32">
      <div className="relative max-w-4xl mx-auto">
        <div className="fade-in-element opacity-0 translate-y-8 transition-all duration-1000 ease-out text-center p-8 md:p-10 rounded-3xl border border-white/20 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/15%),theme(backgroundColor.white/5%))]">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-white mb-6 text-balance leading-tight">
            Pronto para transformar o{" "}
            <span className="font-medium italic bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              atendimento ao cliente
            </span>
            ?
          </h3>
          <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
            Junte-se a equipes que usam o CHAT - SPX para centralizar conversas e acelerar respostas.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="demo-name" className="text-sm text-white/80">
                  Nome
                </label>
                <input
                  id="demo-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Seu nome"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="demo-company" className="text-sm text-white/80">
                  Empresa
                </label>
                <input
                  id="demo-company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Nome da empresa"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="demo-whatsapp" className="text-sm text-white/80">
                  WhatsApp
                </label>
                <input
                  id="demo-whatsapp"
                  name="whatsapp"
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="00 00000-0000"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label htmlFor="demo-volume" className="text-sm text-white/80">
                  Volume mensal (opcional)
                </label>
                <select
                  id="demo-volume"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                  className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                >
                  <option value="" className="bg-white text-slate-500">
                    Selecione
                  </option>
                  <option value="ate-500" className="bg-white text-slate-900">
                    Ate 500 atendimentos
                  </option>
                  <option value="501-2000" className="bg-white text-slate-900">
                    501 a 2000 atendimentos
                  </option>
                  <option value="2001-5000" className="bg-white text-slate-900">
                    2001 a 5000 atendimentos
                  </option>
                  <option value="mais-5000" className="bg-white text-slate-900">
                    Mais de 5000 atendimentos
                  </option>
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-left">
              <label htmlFor="demo-message" className="text-sm text-white/80">
                Mensagem (opcional)
              </label>
              <textarea
                id="demo-message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
                placeholder="Conte um pouco do seu desafio"
              />
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className="group inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-6 bg-gradient-to-r from-white to-blue-100 text-slate-900 rounded-full font-semibold text-base md:text-lg hover:from-blue-50 hover:to-blue-200 transition-all duration-300 hover:scale-105 shadow-2xl disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "sending" ? "Enviando..." : "Quero uma demonstracao"}
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              <div className="min-h-[20px]" aria-live="polite">
                {status === "success" && (
                  <p className="text-sm text-green-200">Pedido enviado. Retornaremos em breve.</p>
                )}
                {status === "error" && <p className="text-sm text-red-200">{errorMessage}</p>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

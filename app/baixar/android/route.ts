import { APP } from "@/lib/app-download"

export const dynamic = "force-dynamic"

// Endereço fixo do download Android (botão e QR code apontam para cá).
// A Release do GitHub já serve o APK com Content-Type
// application/vnd.android.package-archive, Content-Disposition e Range.
export function GET() {
  return Response.redirect(APP.playLiberada ? APP.playStore : APP.apkOrigem, 302)
}

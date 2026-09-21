// Tudo que a página /baixar precisa saber sobre o app fica aqui.
// Quando o app for publicado na Google Play, troque `playLiberada` para true:
// o botão do Android passa a abrir a loja e
// /baixar/android redireciona para a Play Store.
export const APP = {
  versao: "4.3.3",
  appStore: "https://apps.apple.com/br/app/chat-spx/id6808267950",
  appStoreId: "6808267950",
  playStore: "https://play.google.com/store/apps/details?id=com.spx.chat",
  playLiberada: false,
  // O APK (~107 MB) não cabe no git: fica como asset da Release no GitHub.
  // O botão aponta para /baixar/android, que redireciona para cá.
  apkOrigem:
    "https://github.com/Dev-Simplex/landing-page-chatspx/releases/download/android-v4.3.3/ChatSPX-4.3.3-direto.apk",
  apkSha256: "70f46d1bf7f88122d314f155d37a3468b7c493e759daaebd614b82cbe6c2f426",
  iosMinimo: "15.1",
  androidMinimo: "7.0",
}

// Tudo que a página /baixar precisa saber sobre o app fica aqui.
// Quando o app for publicado na Google Play, troque `playLiberada` para true:
// o botão do Android passa a abrir a loja e
// /baixar/android redireciona para a Play Store.
export const APP = {
  versao: "4.3.4",
  appStore: "https://apps.apple.com/br/app/chat-spx/id6808267950",
  appStoreId: "6808267950",
  playStore: "https://play.google.com/store/apps/details?id=com.spx.chat",
  playLiberada: false,
  // O APK (~107 MB) não cabe no git: fica como asset da Release no GitHub.
  // O botão aponta para /baixar/android, que redireciona para cá.
  apkOrigem:
    "https://github.com/Dev-Simplex/landing-page-chatspx/releases/download/android-v4.3.4/ChatSPX-4.3.4.apk",
  apkSha256: "1a01a0f9e008c901df462940880e2062b356be07b87793579f21bfd058c84083",
  iosMinimo: "15.1",
  androidMinimo: "7.0",
}

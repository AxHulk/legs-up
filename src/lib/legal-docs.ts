export const LEGAL_DOCS = {
  privacyPolicy: "/docs/politika-obrabotki-personalnyh-dannyh.pdf",
  personalDataConsent: "/docs/soglasie-na-obrabotku-personalnyh-dannyh.pdf",
  cookiesConsent: "/docs/soglasie-na-cookies.pdf",
  marketingConsent: "/docs/soglasie-na-reklamnuyu-rassylku.pdf",
  offer: "/offer",
} as const;

export const LEGAL_LINKS = [
  { href: LEGAL_DOCS.privacyPolicy, label: "Политика обработки персональных данных" },
  { href: LEGAL_DOCS.personalDataConsent, label: "Согласие на обработку персональных данных" },
  { href: LEGAL_DOCS.cookiesConsent, label: "Согласие на использование файлов cookies" },
  { href: LEGAL_DOCS.offer, label: "Публичная оферта" },
  { href: LEGAL_DOCS.marketingConsent, label: "Согласие на получение рекламных сообщений" },
] as const;

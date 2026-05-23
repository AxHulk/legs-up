import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function Block({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14 first:mt-0">
      {eyebrow && (
        <div className="eyebrow mb-3" style={{ color: "var(--walnut)" }}>
          {eyebrow}
        </div>
      )}
      <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-5">{title}</h2>
      <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function PaymentsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>Безопасность платежей и политика возврата — НОГИ ВВЕРХ</title>
        <meta name="description" content="Условия оплаты, защита платёжных данных и порядок возврата средств в студии пилатеса «НОГИ ВВЕРХ»." />
        <meta property="og:title" content="Безопасность платежей и политика возврата — НОГИ ВВЕРХ" />
        <meta property="og:description" content="Методы оплаты, технология защиты, конфиденциальность и порядок возврата денежных средств." />
      </Helmet>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 pattern-floral opacity-40 pointer-events-none" />
          <div className="relative mx-auto max-w-[900px] px-6 lg:px-12 text-center">
            <span className="eyebrow justify-center">Юридический документ</span>
            <h1 className="hero-headline mt-6 text-4xl md:text-6xl">
              Безопасность платежей и{" "}
              <span className="italic-accent">политика возврата</span>
            </h1>
            <p className="mt-6 text-foreground/70 text-base md:text-lg max-w-[680px] mx-auto">
              Условия оплаты услуг студии пилатеса «НОГИ ВВЕРХ», защита данных и порядок
              возврата денежных средств.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="mx-auto max-w-[860px] px-6 lg:px-12">
            <article className="bg-card rounded-[var(--radius-2xl)] border border-border/60 p-8 md:p-14 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)]">
              <Block eyebrow="Условия оплаты" title="Методы оплаты">
                <p>
                  Оплата физкультурно-оздоровительных услуг студии пилатеса «Ноги Вверх»
                  осуществляется в безналичном порядке с использованием банковских карт
                  национальных и международных платёжных систем:
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Мир", "Visa International", "Mastercard Worldwide", "UnionPay"].map(
                    (label) => (
                      <span
                        key={label}
                        className="inline-flex items-center px-4 py-1.5 rounded-full border border-[var(--olive)]/30 bg-[var(--olive)]/5 text-[var(--olive-deep)] text-xs tracking-wider uppercase"
                      >
                        {label}
                      </span>
                    ),
                  )}
                </div>
                <p>
                  При выборе безналичной формы оплаты оформление платежа производится
                  непосредственно после выбора абонемента или разового занятия в интерфейсе
                  онлайн-записи YCLIENTS.
                </p>
              </Block>

              <Block title="Технология защиты и процессинг">
                <p>
                  Оплата происходит через защищённый авторизационный сервер платёжного шлюза
                  нашего банка-партнёра.
                </p>
                <p>
                  При оплате заказа Вы будете автоматически перенаправлены на платёжную форму
                  банка-партнёра, где потребуется ввести реквизиты Вашей банковской карты:
                  номер карты, срок действия, имя держателя, а также трёхзначный код
                  безопасности (CVC2/CVV2). Передача этой информации осуществляется по
                  закрытым сетям передачи данных с высочайшей степенью защиты, по протоколу
                  защищённого соединения <strong>HTTPS</strong> с использованием современных
                  алгоритмов шифрования <strong>SSL</strong>.
                </p>
              </Block>

              <Block title="Конфиденциальность данных">
                <p>
                  Индивидуальный предприниматель Калугина Жанна Юрьевна гарантирует, что
                  введённая Вами конфиденциальная платёжная информация (реквизиты карты,
                  пароли) не поступает на серверы сайта https://nogivverh.ru/ и не сохраняется
                  в базах данных студии. Вся обработка конфиденциальных данных осуществляется
                  исключительно в процессинговом центре банка-эквайера, который обладает
                  сертификатом соответствия стандарту безопасности{" "}
                  <strong>PCI DSS</strong>. Это полностью исключает возможность перехвата
                  Ваших финансовых данных третьими лицами в момент проведения транзакции. Для
                  дополнительной аутентификации держателя карты используется технология{" "}
                  <strong>3D Secure</strong> (проверка по SMS-коду от Вашего банка-эмитента).
                </p>
              </Block>

              {/* Refund policy */}
              <div className="mt-20 pt-10 border-t border-border/60">
                <div className="text-center mb-10">
                  <span className="eyebrow justify-center">Возврат средств</span>
                  <h2 className="hero-headline mt-4 text-3xl md:text-4xl">
                    Политика и порядок <span className="italic-accent">возврата</span>
                  </h2>
                  <p className="mt-4 text-foreground/70 text-sm max-w-[640px] mx-auto">
                    В соответствии со статьёй 32 Закона РФ «О защите прав потребителей»,
                    потребитель вправе расторгнуть договор об оказании услуг в любое время,
                    уплатив исполнителю часть цены пропорционально части оказанной услуги, и
                    возместив расходы, понесённые до этого момента.
                  </p>
                </div>

                <ol className="space-y-8 list-none pl-0">
                  {[
                    {
                      title: "Основания для возврата",
                      body: (
                        <>
                          Возврат денежных средств возможен в случае ошибочного списания,
                          отказа Заказчика от неиспользованного абонемента или при досрочном
                          расторжении договора в период действия абонемента.
                        </>
                      ),
                    },
                    {
                      title: "Процедура инициации",
                      body: (
                        <>
                          Для осуществления возврата Клиенту необходимо направить официальное
                          заявление в свободной форме на электронный адрес технической
                          поддержки студии:{" "}
                          <a href="mailto:info@nogivverh.ru" className="ghost-link">
                            info@nogivverh.ru
                          </a>
                          . В заявлении обязательно указываются: ФИО, номер телефона,
                          привязанный к аккаунту YCLIENTS, последние 4 цифры карты, с которой
                          производилась оплата, и причина возврата.
                        </>
                      ),
                    },
                    {
                      title: "Правила расчёта",
                      body: (
                        <>
                          Сумма, подлежащая возврату за частично использованный абонемент,
                          рассчитывается как разница между полной стоимостью абонемента и
                          стоимостью фактически посещённых тренировок. Стоимость посещённых
                          тренировок в данном случае пересчитывается по тарифу разового
                          посещения, действующему на момент покупки абонемента, без учёта
                          оптовых скидок, заложенных в абонемент.
                        </>
                      ),
                    },
                    {
                      title: "Сроки и механика перечисления",
                      body: (
                        <>
                          В случае одобрения заявки, возврат переведённых средств производится
                          строго на тот же банковский счёт (ту же банковскую карту), с
                          которого была произведена первоначальная оплата транзакции. Выплата
                          наличными средствами не допускается. Возврат инициируется
                          Исполнителем в течение <strong>10 (десяти) рабочих дней</strong> с
                          момента получения корректно оформленного заявления. Обращаем
                          внимание, что фактическое зачисление средств на Ваш счёт зависит от
                          внутренних регламентов Вашего банка-эмитента и может занимать от 1
                          до 30 рабочих дней.
                        </>
                      ),
                    },
                  ].map((item, idx) => (
                    <li key={idx} className="pl-14 relative">
                      <span className="absolute left-0 top-0 font-serif italic text-3xl text-[var(--olive)]">
                        {String(idx + 1).padStart(2, "0")}.
                      </span>
                      <h3 className="font-serif text-xl mb-2">{item.title}</h3>
                      <p className="text-[0.95rem] leading-relaxed text-foreground/80">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap gap-6">
                  <Link to="/offer" className="ghost-link">
                    Публичная оферта
                  </Link>
                  <Link to="/privacy" className="ghost-link">
                    Политика конфиденциальности
                  </Link>
                </div>
                <Link to="/" className="ghost-link">
                  ← Вернуться на главную
                </Link>
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default PaymentsPage;

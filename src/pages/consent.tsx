import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";

function Item({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12 first:mt-0">
      <div className="flex items-baseline gap-4 mb-4">
        <span className="font-serif italic text-3xl text-[var(--olive)]">{number}</span>
        <h2 className="font-serif text-2xl md:text-[1.75rem] text-foreground">{title}</h2>
      </div>
      <div className="space-y-4 text-[0.95rem] leading-relaxed text-foreground/80">
        {children}
      </div>
    </section>
  );
}

function ConsentPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>Согласие на обработку персональных данных — НОГИ ВВЕРХ</title>
        <meta name="description" content="Условия согласия на обработку персональных данных при использовании сайта студии пилатеса «НОГИ ВВЕРХ»." />
        <meta property="og:title" content="Согласие на обработку персональных данных — НОГИ ВВЕРХ" />
        <meta property="og:description" content="Условия, на которых пользователь даёт согласие на обработку персональных данных Оператору." />
      </Helmet>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden">
          <div className="absolute inset-0 pattern-floral opacity-40 pointer-events-none" />
          <div className="relative mx-auto max-w-[900px] px-6 lg:px-12 text-center">
            <span className="eyebrow justify-center">Юридический документ</span>
            <h1 className="hero-headline mt-6 text-4xl md:text-6xl">
              Согласие на обработку{" "}
              <span className="italic-accent">персональных данных</span>
            </h1>
            <p className="mt-6 text-foreground/70 text-base md:text-lg max-w-[640px] mx-auto">
              Условия, на которых Пользователь предоставляет согласие на обработку своих
              персональных данных Оператору сайта nogivverh.ru.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="pb-24">
          <div className="mx-auto max-w-[860px] px-6 lg:px-12">
            <article className="bg-card rounded-[var(--radius-2xl)] border border-border/60 p-8 md:p-14 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.15)]">
              <p className="text-[0.95rem] leading-relaxed text-foreground/80 mb-2">
                Настоящим, осуществляя регистрацию, запись на услуги или оплату на веб-сайте{" "}
                <a href="https://nogivverh.ru/" className="ghost-link">
                  https://nogivverh.ru/
                </a>{" "}
                (далее – Сайт) и в интегрированных виджетах (YCLIENTS), я, действуя свободно,
                своей волей и в своем интересе, являясь дееспособным физическим лицом (далее –
                Субъект), даю конкретное, информированное и сознательное согласие
                Индивидуальному предпринимателю{" "}
                <strong>Калугиной Жанне Юрьевне</strong> (ИНН 771596747700, ОГРНИП
                326774600190361, юридический адрес: 127224, г. Москва, ул. Широкая, д. 24,
                кв. 282) (далее – Оператор) на обработку моих персональных данных на
                нижеследующих условиях:
              </p>

              <Item number="1." title="Объём данных">
                <p>
                  Согласие даётся на обработку следующих персональных данных: фамилия, имя,
                  отчество; номер мобильного телефона; адрес электронной почты; сведения об
                  использовании Сайта (IP-адрес, данные файлов cookie, пользовательские клики и
                  сессии).
                </p>
              </Item>

              <Item number="2." title="Целевое назначение">
                <p>
                  Персональные данные собираются исключительно с целью заключения и исполнения
                  Договора возмездного оказания услуг (Публичной оферты), организации процесса
                  записи на тренировки по пилатесу, осуществления клиентского обслуживания,
                  информационного оповещения о статусе бронирования и проведения безналичных
                  расчётов.
                </p>
              </Item>

              <Item number="3." title="Перечень разрешённых действий">
                <p>
                  Я предоставляю Оператору право осуществлять все действия (операции) с моими
                  персональными данными, включая сбор, запись, систематизацию, накопление,
                  хранение, уточнение, обновление, извлечение, использование, передачу
                  (предоставление, доступ), блокирование, удаление и уничтожение. Обработка
                  осуществляется как с использованием средств автоматизации, так и без таковых.
                </p>
              </Item>

              <Item number="4." title="Поручение третьим лицам">
                <p>
                  Я выражаю явное согласие на то, что Оператор вправе поручать обработку моих
                  персональных данных и передавать их в необходимом объёме партнёрам,
                  участвующим в оказании услуг, в частности:
                </p>
                <ul className="list-disc pl-6 space-y-1.5">
                  <li>владельцу платформы бронирования YCLIENTS;</li>
                  <li>банку АО «ТБанк» — для процессинга платежей.</li>
                </ul>
              </Item>

              <Item number="5." title="Срок действия">
                <p>
                  Настоящее Согласие вступает в силу с момента его принятия (проставления
                  электронной отметки на Сайте) и действует в течение{" "}
                  <strong>20 (двадцати) лет</strong>, либо до момента отзыва.
                </p>
              </Item>

              <Item number="6." title="Порядок отзыва">
                <p>
                  Я осведомлён(а), что настоящее Согласие может быть отозвано мной в любой
                  момент путём направления соответствующего письменного заявления на адрес
                  электронной почты Оператора:{" "}
                  <a href="mailto:info@nogivverh.ru" className="ghost-link">
                    info@nogivverh.ru
                  </a>
                  . В случае отзыва согласия Оператор вправе продолжить обработку персональных
                  данных без моего согласия при наличии оснований, предусмотренных пунктами
                  2–11 части 1 статьи 6 Федерального закона №152-ФЗ.
                </p>
              </Item>

              <div className="mt-16 pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                <Link to="/privacy" className="ghost-link">
                  Политика конфиденциальности →
                </Link>
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

export default ConsentPage;

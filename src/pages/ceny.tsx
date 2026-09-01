import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Contacts } from "@/components/site/Contacts";
import { BookingButton } from "@/components/site/BookingButton";

function PriceTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: (string | React.ReactNode)[][];
}) {
  return (
    <div className="overflow-x-auto my-6 rounded-[var(--radius-xl)] border border-border/60">
      <table className="w-full text-sm md:text-base">
        <thead className="bg-[var(--olive)]/10 text-foreground">
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="text-left font-serif font-normal px-4 py-3 border-b border-border/60"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-background/50">
              {row.map((cell, j) => (
                <td
                  key={j}
                  className="px-4 py-3 border-b border-border/40 text-foreground/85"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const URL = "https://nogivverh.ru/ceny";

const singleRows: (string | React.ReactNode)[][] = [
  ["Группа", "55 мин", <strong>1 200 ₽</strong>],
  ["Группа реформер", "55 мин", <strong>2 100 ₽</strong>],
  ["Персональное занятие", "55 мин", <strong>3 100 ₽</strong>],
  ["Занятие вдвоём (сплит)", "55 мин", <strong>4 200 ₽</strong>],
];

const trialRows: (string | React.ReactNode)[][] = [
  ["Пробное занятие в группе", "55 мин", <strong>650 ₽</strong>],
  ["Пробное занятие группа реформер", "55 мин", <strong>1 000 ₽</strong>],
];

const packRows: (string | React.ReactNode)[][] = [
  ["Групповые занятия", "4 занятия", "4 недели", <strong>3 800 ₽</strong>, "950 ₽"],
  ["Групповые занятия", "8 занятий", "8 недель", <strong>7 200 ₽</strong>, "900 ₽"],
  ["Групповые занятия", "12 занятий", "8 недель", <strong>10 200 ₽</strong>, "850 ₽"],
  ["Групповые реформер", "4 занятия", "4 недели", <strong>7 600 ₽</strong>, "1 900 ₽"],
  ["Групповые реформер", "8 занятий", "8 недель", <strong>14 400 ₽</strong>, "1 800 ₽"],
  ["Групповые реформер", "12 занятий", "8 недель", <strong>20 400 ₽</strong>, "1 700 ₽"],
  ["Персональные", "4 занятия", "4 недели", <strong>11 600 ₽</strong>, "2 900 ₽"],
  ["Персональные", "8 занятий", "8 недель", <strong>22 400 ₽</strong>, "2 800 ₽"],
  ["Персональные", "12 занятий", "8 недель", <strong>31 200 ₽</strong>, "2 600 ₽"],
];


export default function CenyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>Цены на пилатес на реформерах в Балашихе — НОГИ ВВЕРХ</title>
        <meta
          name="description"
          content="Цены на пилатес на реформерах и индивидуальные занятия в Балашихе и Железнодорожном. Разовое занятие от 1 000 ₽, абонементы на реформер от 7 900 ₽. Ул. Автозаводская, 5."
        />
        <link rel="canonical" href={URL} />
        <meta property="og:title" content="Цены — НОГИ ВВЕРХ, пилатес на реформерах в Балашихе" />
        <meta
          property="og:description"
          content="Стоимость разовых занятий и абонементов на пилатес на реформерах, аэройогу и тренировки для спины в Железнодорожном."
        />
        <meta property="og:url" content={URL} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://nogivverh.ru/" },
            { "@type": "ListItem", position: 2, name: "Цены", item: URL },
          ],
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "PriceSpecification",
          name: "Цены на пилатес на реформерах в Балашихе",
          priceCurrency: "RUB",
          minPrice: 1000,
          maxPrice: 22400,
        })}</script>
      </Helmet>
      <Header />
      <main>
        <section className="relative pt-40 pb-16 lg:pt-48 lg:pb-20 overflow-hidden bg-sand">
          <div className="absolute inset-0 pattern-floral opacity-[0.4]" />
          <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
            <span className="eyebrow">Прейскурант</span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl">
              Цены на <span className="italic-accent">пилатес на реформерах</span> в Балашихе
            </h1>
            <p className="mt-8 text-lg leading-relaxed text-foreground/75 max-w-2xl">
              Студия «НОГИ ВВЕРХ» в Железнодорожном (ул. Автозаводская, 5). Разовые
              посещения и абонементы на пилатес на реформерах, индивидуальные тренировки,
              аэройогу и групповые занятия. Действует пробное занятие по цене разового.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <BookingButton className="btn-primary">Записаться на занятие</BookingButton>
              <Link to="/#schedule" className="ghost-link">Смотреть расписание →</Link>
            </div>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12 space-y-16">
            <article>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Разовые занятия
              </h2>
              <p className="mt-4 text-foreground/75 max-w-2xl">
                Цена одного занятия в студии. Пробное занятие оплачивается по цене разового
                по выбранному направлению.
              </p>
              <PriceTable
                headers={["Направление", "Длительность", "Стоимость"]}
                rows={singleRows}
              />
            </article>

            <article>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Абонементы
              </h2>
              <p className="mt-4 text-foreground/75 max-w-2xl">
                Абонемент — самый выгодный способ заниматься регулярно. Цена за одно
                занятие в составе абонемента ниже, чем при разовом посещении.
              </p>
              <PriceTable
                headers={[
                  "Направление",
                  "Кол-во занятий",
                  "Срок действия",
                  "Стоимость",
                  "За одно занятие",
                ]}
                rows={packRows}
              />
              <p className="mt-2 text-sm text-foreground/60">
                Абонемент именной, на третьих лиц не передаётся. Подробные условия — в
                {" "}<Link to="/offer" className="underline underline-offset-4">публичной оферте</Link>.
              </p>
            </article>

            <article className="rounded-[var(--radius-2xl)] bg-cream border border-border/60 p-8 md:p-12">
              <h2 className="font-serif text-2xl md:text-3xl text-foreground">
                Скидки и спецпредложения
              </h2>
              <ul className="mt-5 space-y-2.5 text-foreground/80 list-disc pl-5">
                <li>Скидки для детей и пенсионеров — уточняйте у администратора.</li>
                <li>Пробное занятие на любое направление — по цене разового.</li>
                <li>
                  Сплит-формат на реформере (мини-группа на 2 человека) — выгоднее, чем две
                  индивидуальные тренировки.
                </li>
              </ul>
            </article>

            <article>
              <h2 className="font-serif text-3xl md:text-4xl text-foreground">
                Как оплатить и записаться
              </h2>
              <div className="mt-5 space-y-4 text-foreground/80 leading-relaxed max-w-2xl">
                <p>
                  Записаться можно онлайн через кнопку «Записаться» — на удобный день и
                  время в нашем расписании. Оплата принимается в студии (наличными или
                  картой) и онлайн при бронировании.
                </p>
                <p>
                  Адрес студии: Московская область, г. Балашиха, мкр. Железнодорожный,
                  ул. Автозаводская, д. 5, пом. 2. Удобно добираться от ж/д станции
                  Железнодорожная и из соседних районов Балашихи.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <BookingButton className="btn-primary">Записаться онлайн</BookingButton>
                <Link to="/pilates-reformer" className="ghost-link">О пилатесе на реформере →</Link>
              </div>
            </article>
          </div>
        </section>

        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

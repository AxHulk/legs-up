import { Helmet } from "react-helmet-async";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Contacts } from "@/components/site/Contacts";
import { BookingButton } from "@/components/site/BookingButton";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  description: string;
  canonicalPath: string;
  eyebrow: string;
  h1: React.ReactNode;
  lead: string;
  sections: { h: string; p: React.ReactNode }[];
  related: { to: string; label: string }[];
};

export function SeoLanding({
  title, description, canonicalPath, eyebrow, h1, lead, sections, related,
}: Props) {
  const url = `https://legs-up.lovable.app${canonicalPath}`;
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Главная", item: "https://legs-up.lovable.app/" },
            { "@type": "ListItem", position: 2, name: typeof h1 === "string" ? h1 : title, item: url },
          ],
        })}</script>
      </Helmet>
      <Header />
      <main>
        <section className="relative pt-40 pb-20 lg:pt-48 lg:pb-28 overflow-hidden bg-sand">
          <div className="absolute inset-0 pattern-floral opacity-[0.4]" />
          <div className="relative mx-auto max-w-[1100px] px-6 lg:px-12">
            <span className="eyebrow">{eyebrow}</span>
            <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl text-foreground max-w-4xl">{h1}</h1>
            <p className="mt-8 text-lg leading-relaxed text-foreground/75 max-w-2xl">{lead}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <BookingButton className="btn-primary">Записаться на занятие</BookingButton>
              <Link to="/#directions" className="ghost-link">Все направления →</Link>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-[900px] px-6 lg:px-12 space-y-14">
            {sections.map((s) => (
              <article key={s.h}>
                <h2 className="font-serif text-3xl md:text-4xl text-foreground">{s.h}</h2>
                <div className="mt-5 text-base leading-relaxed text-foreground/80 space-y-4">{s.p}</div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-16 bg-cream">
          <div className="mx-auto max-w-[1100px] px-6 lg:px-12">
            <h2 className="font-serif text-2xl text-foreground">Смотрите также</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {related.map((r) => (
                <Link key={r.to} to={r.to} className="px-5 py-2.5 rounded-full bg-sand border border-border/60 hover:border-olive/50 transition-colors text-sm">
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

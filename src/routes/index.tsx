import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Directions } from "@/components/site/Directions";
import { Team } from "@/components/site/Team";
import { Space } from "@/components/site/Space";
import { Schedule } from "@/components/site/Schedule";
import { Pricing } from "@/components/site/Pricing";
import { Reviews } from "@/components/site/Reviews";
import { Contacts } from "@/components/site/Contacts";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "НОГИ ВВЕРХ — студия пилатеса на реформерах в Балашихе" },
      { name: "description", content: "Студия пилатеса на профессиональных реформерах в Железнодорожном. Малые группы, сертифицированные инструкторы, индивидуальные программы. Первое занятие — бесплатно." },
      { property: "og:title", content: "НОГИ ВВЕРХ — студия фитнеса и пилатеса" },
      { property: "og:description", content: "Почувствуй гармонию с телом. Пилатес на реформерах, йога, растяжка в гамаках в Балашихе." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <Directions />
        <Team />
        <Space />
        <Schedule />
        <Pricing />
        <Reviews />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

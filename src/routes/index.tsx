import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Directions } from "@/components/site/Directions";
import { WhyUs } from "@/components/site/WhyUs";
import { Team } from "@/components/site/Team";
import { Pricing } from "@/components/site/Pricing";
import { Schedule } from "@/components/site/Schedule";
import { Contacts } from "@/components/site/Contacts";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "НОГИ ВВЕРХ — студия фитнеса и пилатеса в Балашихе" },
      { name: "description", content: "Студия пилатеса на реформерах в Балашихе. Профессиональные инструкторы, малые группы, удобное расписание. Первое занятие бесплатно." },
      { property: "og:title", content: "НОГИ ВВЕРХ — студия фитнеса и пилатеса" },
      { property: "og:description", content: "Пилатес на реформерах, растяжка в гамаках, йога и функциональный тренинг в Балашихе." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Directions />
        <WhyUs />
        <Team />
        <Pricing />
        <Schedule />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

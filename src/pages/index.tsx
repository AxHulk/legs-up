import { Helmet } from "react-helmet-async";

import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Directions } from "@/components/site/Directions";
import { Programs } from "@/components/site/Programs";
import { Memberships } from "@/components/site/Memberships";
import { Team } from "@/components/site/Team";
import { Space } from "@/components/site/Space";
import { Schedule } from "@/components/site/Schedule";
import { Pricing } from "@/components/site/Pricing";
import { Reviews } from "@/components/site/Reviews";
import { Contacts } from "@/components/site/Contacts";
import { Footer } from "@/components/site/Footer";
import { Faq } from "@/components/site/Faq";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>Студия пилатеса на реформерах в Балашихе — НОГИ ВВЕРХ</title>
        <meta name="description" content="Студия пилатеса на профессиональных реформерах в Балашихе и Железнодорожном. Мини-группы, индивидуальные занятия, аэройога, тренировки для спины. Ул. Автозаводская, 5." />
        <link rel="canonical" href="https://nogivverh.ru/" />
        <meta property="og:title" content="НОГИ ВВЕРХ — пилатес на реформерах в Балашихе" />
        <meta property="og:description" content="Пилатес на реформерах, аэройога и тренировки для здоровой спины в Железнодорожном. Мини-группы и индивидуальные программы." />
        <meta property="og:url" content="https://nogivverh.ru/" />
      </Helmet>
      <Header />
      <main>
        <Hero />
        <About />
        <Directions />
        <Programs />
        <Team />
        <Space />
        <Schedule />
        <Memberships />
        {/* <Pricing /> */}
        {/* <Reviews /> */}
        <Faq />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default Index;

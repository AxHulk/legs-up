import { Helmet } from "react-helmet-async";

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

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Helmet>
        <title>НОГИ ВВЕРХ — студия пилатеса на реформерах в Балашихе</title>
        <meta name="description" content="Студия пилатеса на профессиональных реформерах в Железнодорожном. Малые группы, сертифицированные инструкторы, индивидуальные программы. Первое занятие — бесплатно." />
        <meta property="og:title" content="НОГИ ВВЕРХ — студия фитнеса и пилатеса" />
        <meta property="og:description" content="Почувствуй гармонию с телом. Пилатес на реформерах, йога, растяжка в гамаках в Балашихе." />
      </Helmet>
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

export default Index;

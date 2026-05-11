import { useEffect, useState } from "react";
import logo from "@/assets/logo-nogi-vverh.png";
import { BookingButton } from "@/components/site/BookingButton";

const nav = [
  { href: "#about", label: "О студии" },
  { href: "#directions", label: "Направления" },
  { href: "#team", label: "Инструкторы" },
  { href: "#schedule", label: "Расписание" },
  { href: "#contacts", label: "Контакты" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-sand/92 backdrop-blur-md border-b border-border/60 py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex items-center justify-between gap-6">
        <a href="#top" className="flex items-center gap-3 shrink-0">
          <img
            src={logo}
            alt="НОГИ ВВЕРХ"
            className={`h-10 lg:h-12 w-auto transition-all ${
              scrolled ? "[filter:brightness(0)_saturate(100%)_invert(28%)_sepia(18%)_saturate(900%)_hue-rotate(45deg)]" : "[filter:brightness(0)_invert(1)]"
            }`}
          />
        </a>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-[13px] tracking-wide transition-colors ${
                scrolled ? "text-foreground/85 hover:text-olive" : "text-sand/90 hover:text-sand"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <BookingButton className="btn-primary !py-2.5 !px-5 text-[13px]">
          Записаться
        </BookingButton>
      </div>
    </header>
  );
}

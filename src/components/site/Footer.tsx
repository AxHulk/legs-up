import { Link } from "react-router-dom";
import logo from "@/assets/logo-nogi-vverh.png";

const legalLinks = [
  { to: "/offer" as const, label: "Публичная оферта" },
  { to: "/privacy" as const, label: "Политика конфиденциальности" },
  { to: "/consent" as const, label: "Согласие на обработку ПдН" },
  { to: "/payments" as const, label: "Платежи и возврат" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-sand/70 border-t border-sand/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <img
            src={logo}
            alt="НОГИ ВВЕРХ"
            className="h-12 w-auto [filter:brightness(0)_invert(1)] opacity-90"
          />
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs tracking-wider text-sand/60">
            {legalLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-sand transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-sand/10 text-xs tracking-wider text-sand/40 text-center md:text-right">
          © {new Date().getFullYear()} Студия «НОГИ ВВЕРХ» · Все права защищены
        </div>
      </div>
    </footer>
  );
}

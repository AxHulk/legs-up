import { Link } from "react-router-dom";
import logo from "@/assets/logo-nogi-vverh.png";
import { LEGAL_LINKS } from "@/lib/legal-docs";

export function Footer() {
  return (
    <footer className="bg-foreground text-sand/70 border-t border-sand/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          <img
            src={logo}
            alt="НОГИ ВВЕРХ"
            width={240}
            height={48}
            className="h-10 md:h-12 w-auto max-w-[180px] md:max-w-none object-contain [filter:brightness(0)_invert(1)] opacity-90"
          />
          <nav aria-label="Документы" className="md:text-right">
            <h2 className="text-[10px] uppercase tracking-[0.25em] text-sand/40 mb-3">
              Документы
            </h2>
            <ul className="flex flex-col gap-2 text-xs tracking-wider text-sand/60">
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/docs/") ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-sand transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link to={link.href} className="hover:text-sand transition-colors">
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="mt-8 pt-6 border-t border-sand/10 text-xs tracking-wider text-sand/40 text-center md:text-right">
          © {new Date().getFullYear()} Студия «НОГИ ВВЕРХ» · Все права защищены
        </div>
      </div>
    </footer>
  );
}


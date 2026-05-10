import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo-nogi-vverh.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-sand/70 border-t border-sand/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={logo} alt="НОГИ ВВЕРХ" className="h-12 w-auto [filter:brightness(0)_invert(1)] opacity-90" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-xs tracking-wider text-sand/50">
          <Link to="/privacy" className="hover:text-sand transition-colors">
            Политика конфиденциальности
          </Link>
          <Link to="/consent" className="hover:text-sand transition-colors">
            Согласие на обработку ПдН
          </Link>
          <span>© {new Date().getFullYear()} Студия «НОГИ ВВЕРХ» · Все права защищены</span>
        </div>
      </div>
    </footer>
  );
}

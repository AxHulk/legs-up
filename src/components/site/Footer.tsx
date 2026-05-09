import logo from "@/assets/logo-nogi-vverh.png";

export function Footer() {
  return (
    <footer className="bg-foreground text-sand/70 border-t border-sand/10">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img src={logo} alt="НОГИ ВВЕРХ" className="h-12 w-auto [filter:brightness(0)_invert(1)] opacity-90" />
        </div>
        <div className="text-xs tracking-wider text-sand/50">
          © {new Date().getFullYear()} Студия «НОГИ ВВЕРХ» · Все права защищены
        </div>
      </div>
    </footer>
  );
}

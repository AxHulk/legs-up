const nav = [
  { href: "#about", label: "О студии" },
  { href: "#directions", label: "Направления" },
  { href: "#team", label: "Инструкторы" },
  { href: "#pricing", label: "Абонементы" },
];

export function Header() {
  return (
    <header className="absolute top-0 inset-x-0 z-30">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <div className="leading-tight">
            <div className="font-serif text-xl tracking-tight text-foreground">НОГИ ВВЕРХ</div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-walnut/80">студия фитнеса и пилатеса</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-olive transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#contacts" className="btn-primary !py-3 !px-6 text-sm">Записаться</a>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-cocoa text-sand/80">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="font-serif text-lg text-sand">НОГИ ВВЕРХ</div>
          <div className="text-[11px] tracking-[0.2em] uppercase text-sand/60">студия фитнеса и пилатеса</div>
        </div>
        <div className="text-sm">© {new Date().getFullYear()} Все права защищены</div>
      </div>
    </footer>
  );
}

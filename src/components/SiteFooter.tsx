import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} BargainBase. Save time, save money.</p>
        <nav className="flex gap-5">
          <Link href="/deals" className="hover:text-foreground">Deals</Link>
          <Link href="/automation" className="hover:text-foreground">Automation</Link>
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
        </nav>
      </div>
    </footer>
  );
}

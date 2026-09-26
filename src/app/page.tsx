import Link from "next/link";
import { tools } from "@/lib/tools";

const modules = [
  {
    href: "/deals",
    name: "Deals & Coupons",
    description: "Browse discount codes and offers by store and category, and copy a code in one click.",
    cta: "Browse deals",
    icon: (
      <path d="M3 7a2 2 0 0 1 2-2h5l9 9-7 7-9-9V7zm5 1a1 1 0 1 0 0 .01" />
    ),
  },
  {
    href: "/automation",
    name: "Task Automation",
    description: "Shortcuts for everyday tasks — start with instant ride-booking links for Uber and Google Maps.",
    cta: "Try a shortcut",
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
  {
    href: "/tools",
    name: "Handy Tools",
    description: "Quick calculators and generators that run entirely in your browser. No sign-up.",
    cta: "Open tools",
    icon: (
      <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.1-.4-.4-2.1 2.5-2.5z" />
    ),
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_0%,var(--brand-soft),transparent)]"
        />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-20 text-center sm:px-6 sm:pt-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-brand" />
            Now live: deals, ride shortcuts & 4 free tools
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
            Spend less. <span className="text-brand">Do more.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            BargainBase brings together deals, everyday automation, and handy
            little tools — so saving time and money takes seconds.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/deals" className="btn px-6 py-3 text-base">
              Find deals
            </Link>
            <Link href="/tools" className="btn-ghost px-6 py-3 text-base">
              Explore tools
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {modules.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className="card group p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-soft text-brand-strong">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {m.icon}
                </svg>
              </div>
              <h2 className="mt-5 text-lg font-semibold">{m.name}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{m.description}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                {m.cta}
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Popular tools</h2>
              <p className="mt-1 text-muted">Free, instant, and private — everything runs on your device.</p>
            </div>
            <Link href="/tools" className="hidden text-sm font-semibold text-brand sm:block">
              All tools →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="rounded-xl border border-border p-5 transition hover:border-brand"
              >
                <span className="text-2xl text-brand">{tool.icon}</span>
                <h3 className="mt-3 font-semibold">{tool.name}</h3>
                <p className="mt-1 text-sm text-muted">{tool.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

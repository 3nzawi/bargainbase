const modules = [
  {
    name: "Deals & Coupons",
    description: "Find real discount codes and cashback offers, all in one place.",
  },
  {
    name: "Task Automation",
    description: "One-click shortcuts for everyday tasks like booking rides.",
  },
  {
    name: "Handy Tools",
    description: "Small generators and utilities — QR codes, resumes, and more.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight">
            BargainBase
          </span>
          <span className="text-sm text-foreground/60">Coming soon</span>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 py-20">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everyday tools, automation, and deals — all in one place.
          </h1>
          <p className="mt-4 text-lg text-foreground/70">
            BargainBase is being built as a home for the small tools that make
            everyday life easier and cheaper. Modules are launching soon.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {modules.map((module) => (
            <div
              key={module.name}
              className="rounded-xl border border-black/10 p-5 dark:border-white/10"
            >
              <h2 className="font-semibold">{module.name}</h2>
              <p className="mt-2 text-sm text-foreground/60">
                {module.description}
              </p>
              <span className="mt-4 inline-block text-xs font-medium uppercase tracking-wide text-foreground/40">
                Coming soon
              </span>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-black/10 px-6 py-6 text-center text-sm text-foreground/50 dark:border-white/10">
        © {new Date().getFullYear()} BargainBase
      </footer>
    </div>
  );
}

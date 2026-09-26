"use client";

import { useMemo, useState } from "react";
import type { Deal } from "@/lib/deals";
import { CopyButton } from "@/components/CopyButton";

export function DealsBrowser({ deals, categories }: { deals: Deal[]; categories: string[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deals.filter(
      (d) =>
        (category === "All" || d.category === category) &&
        (!q || d.store.toLowerCase().includes(q) || d.title.toLowerCase().includes(q)),
    );
  }, [deals, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="search"
          placeholder="Search stores or deals…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input sm:max-w-xs"
        />
        <div className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                category === c
                  ? "border-brand bg-brand text-white dark:text-stone-950"
                  : "border-border text-muted hover:border-brand hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {filtered.length} {filtered.length === 1 ? "deal" : "deals"}
      </p>

      {filtered.length === 0 ? (
        <div className="card mt-4 p-10 text-center text-muted">
          No deals match that search. Try another store or category.
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      )}
    </div>
  );
}

function DealCard({ deal }: { deal: Deal }) {
  return (
    <article className="card flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted">{deal.category}</p>
          <h2 className="mt-1 text-lg font-bold">{deal.store}</h2>
        </div>
        <span className="shrink-0 rounded-lg bg-accent/15 px-2.5 py-1 text-sm font-bold text-amber-700 dark:text-accent">
          {deal.discount}
        </span>
      </div>
      <p className="mt-2 flex-1 text-sm text-muted">{deal.title}</p>

      <div className="mt-5 flex items-center justify-between gap-3">
        {deal.code ? (
          <div className="flex flex-1 items-center justify-between rounded-lg border border-dashed border-brand/60 bg-brand-soft/40 py-1 pl-3 pr-1">
            <code className="font-mono text-sm font-semibold tracking-wider">{deal.code}</code>
            <CopyButton value={deal.code} />
          </div>
        ) : (
          <span className="text-sm font-medium text-brand">No code needed</span>
        )}
      </div>
      {deal.expires && (
        <p className="mt-3 text-xs text-muted">
          Expires{" "}
          {new Date(deal.expires + "T00:00:00").toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      )}
    </article>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/PageHeader";
import { tools } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Handy Tools",
  description: "Free calculators and generators that run in your browser.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Handy Tools"
        title="Small tools, big time-savers"
        description="Everything runs on your device — nothing you type is sent to a server."
      />
      <div className="grid gap-5 sm:grid-cols-2">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="card group flex gap-5 p-6 transition hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
          >
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-2xl text-brand-strong">
              {tool.icon}
            </span>
            <div>
              <h2 className="font-semibold group-hover:text-brand">{tool.name}</h2>
              <p className="mt-1 text-sm text-muted">{tool.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

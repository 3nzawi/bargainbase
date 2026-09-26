import Link from "next/link";

export function PageHeader({
  eyebrow,
  title,
  description,
  back,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  back?: { href: string; label: string };
}) {
  return (
    <div className="mb-10">
      {back && (
        <Link href={back.href} className="mb-4 inline-flex items-center gap-1 text-sm text-muted hover:text-brand">
          ← {back.label}
        </Link>
      )}
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">{eyebrow}</p>
      )}
      <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
      {description && <p className="mt-3 max-w-2xl text-lg text-muted">{description}</p>}
    </div>
  );
}

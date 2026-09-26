import { PageHeader } from "./PageHeader";
import { tools } from "@/lib/tools";

export function ToolShell({ slug, children }: { slug: string; children: React.ReactNode }) {
  const tool = tools.find((t) => t.slug === slug)!;
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <PageHeader
        back={{ href: "/tools", label: "All tools" }}
        title={tool.name}
        description={tool.description}
      />
      <div className="card p-6 sm:p-8">{children}</div>
    </div>
  );
}

export function toolMetadata(slug: string) {
  const tool = tools.find((t) => t.slug === slug)!;
  return { title: tool.name, description: tool.description };
}

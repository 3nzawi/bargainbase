import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { deals, categories } from "@/lib/deals";
import { DealsBrowser } from "./DealsBrowser";

export const metadata: Metadata = {
  title: "Deals & Coupons",
  description: "Browse discount codes and offers by store and category.",
};

export default function DealsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Deals & Coupons"
        title="Today's best deals"
        description="Search by store or category, then copy a code in one click."
      />
      <DealsBrowser deals={deals} categories={[...categories]} />
    </div>
  );
}

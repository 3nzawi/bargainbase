import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { RideShortcut } from "./RideShortcut";

export const metadata: Metadata = {
  title: "Task Automation",
  description: "Shortcuts for everyday tasks, like booking a ride in one tap.",
};

const upcoming = [
  "Price-drop alerts for products you're watching",
  "Recurring bill & subscription reminders",
  "Saved ride routes (home ↔ work) with one tap",
];

export default function AutomationPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <PageHeader
        eyebrow="Task Automation"
        title="Everyday tasks, one tap away"
        description="Shortcuts that hand off to the official apps — no passwords or accounts shared with us."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <RideShortcut />

        <aside className="card h-fit p-6">
          <h2 className="font-semibold">Coming next</h2>
          <ul className="mt-4 space-y-3">
            {upcoming.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

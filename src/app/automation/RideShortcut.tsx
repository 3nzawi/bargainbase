"use client";

import { useState } from "react";
import { CopyButton } from "@/components/CopyButton";

// Uber's documented universal deep link: https://developer.uber.com/docs/riders/ride-requests/tutorials/deep-links/introduction
function uberLink(pickup: string, dropoff: string) {
  const params = new URLSearchParams({ action: "setPickup" });
  if (pickup) params.set("pickup[formatted_address]", pickup);
  else params.set("pickup", "my_location");
  params.set("dropoff[formatted_address]", dropoff);
  return `https://m.uber.com/ul/?${params}`;
}

function mapsLink(pickup: string, dropoff: string, mode: string) {
  const params = new URLSearchParams({ api: "1", destination: dropoff, travelmode: mode });
  if (pickup) params.set("origin", pickup);
  return `https://www.google.com/maps/dir/?${params}`;
}

export function RideShortcut() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const ready = dropoff.trim().length > 0;
  const p = pickup.trim();
  const d = dropoff.trim();

  return (
    <section className="card p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-soft text-lg">🚗</span>
        <div>
          <h2 className="font-semibold">Ride shortcut</h2>
          <p className="text-sm text-muted">Pre-fill your trip, then open it in Uber or Google Maps.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor="pickup" className="label">Pickup</label>
          <input
            id="pickup"
            className="input"
            placeholder="Leave blank to use your current location"
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="dropoff" className="label">Destination</label>
          <input
            id="dropoff"
            className="input"
            placeholder="e.g. 1 Infinite Loop, Cupertino, CA"
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <a
          href={ready ? uberLink(p, d) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          className={`btn ${ready ? "" : "pointer-events-none opacity-50"}`}
        >
          Open in Uber
        </a>
        <a
          href={ready ? mapsLink(p, d, "driving") : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          className={`btn-ghost ${ready ? "" : "pointer-events-none opacity-50"}`}
        >
          Driving directions
        </a>
        <a
          href={ready ? mapsLink(p, d, "transit") : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          className={`btn-ghost ${ready ? "" : "pointer-events-none opacity-50"}`}
        >
          Transit options
        </a>
      </div>

      {ready && (
        <div className="mt-6 rounded-lg border border-border bg-background p-3">
          <p className="text-xs font-medium text-muted">Save this trip as a shortcut — bookmark or share the link:</p>
          <div className="mt-2 flex items-center gap-2">
            <code className="flex-1 truncate font-mono text-xs">{uberLink(p, d)}</code>
            <CopyButton value={uberLink(p, d)} />
          </div>
        </div>
      )}
    </section>
  );
}

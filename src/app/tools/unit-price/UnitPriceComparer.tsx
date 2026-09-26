"use client";

import { useState } from "react";

type Item = { id: number; name: string; price: string; qty: string };

let nextId = 3;

export function UnitPriceComparer() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: "Small pack", price: "4.99", qty: "12" },
    { id: 2, name: "Big pack", price: "11.49", qty: "30" },
  ]);

  const update = (id: number, field: keyof Omit<Item, "id">, value: string) =>
    setItems((list) => list.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const unitPrices = items.map((i) => {
    const p = parseFloat(i.price);
    const q = parseFloat(i.qty);
    return p > 0 && q > 0 ? p / q : null;
  });
  const valid = unitPrices.filter((u): u is number => u !== null);
  const best = valid.length > 1 ? Math.min(...valid) : null;

  return (
    <div>
      <div className="grid gap-3">
        {items.map((item, idx) => {
          const unit = unitPrices[idx];
          const isBest = best !== null && unit === best;
          const pctMore = best && unit && !isBest ? ((unit - best) / best) * 100 : null;
          return (
            <div
              key={item.id}
              className={`grid grid-cols-2 items-end gap-3 rounded-xl border p-4 sm:grid-cols-[1.4fr_1fr_1fr_auto] ${
                isBest ? "border-brand bg-brand-soft/40" : "border-border"
              }`}
            >
              <div className="col-span-2 sm:col-span-1">
                <label className="label">Item</label>
                <input className="input" value={item.name} onChange={(e) => update(item.id, "name", e.target.value)} />
              </div>
              <div>
                <label className="label">Price ($)</label>
                <input className="input" type="number" min="0" inputMode="decimal" value={item.price} onChange={(e) => update(item.id, "price", e.target.value)} />
              </div>
              <div>
                <label className="label">Quantity</label>
                <input className="input" type="number" min="0" inputMode="decimal" value={item.qty} onChange={(e) => update(item.id, "qty", e.target.value)} />
              </div>
              <div className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:block sm:min-w-28 sm:text-right">
                <div>
                  <p className="text-sm font-bold">{unit !== null ? `$${unit.toFixed(3)}` : "—"}<span className="font-normal text-muted"> /unit</span></p>
                  {isBest && <p className="text-xs font-semibold text-brand">Best value</p>}
                  {pctMore !== null && <p className="text-xs text-muted">{pctMore.toFixed(0)}% more</p>}
                </div>
                {items.length > 2 && (
                  <button
                    type="button"
                    className="text-xs text-muted hover:text-red-500"
                    onClick={() => setItems((list) => list.filter((i) => i.id !== item.id))}
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className="btn-ghost mt-4"
        onClick={() => setItems((list) => [...list, { id: nextId++, name: `Option ${list.length + 1}`, price: "", qty: "" }])}
      >
        + Add another option
      </button>
    </div>
  );
}

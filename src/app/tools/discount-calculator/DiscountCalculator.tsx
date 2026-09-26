"use client";

import { useState } from "react";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export function DiscountCalculator() {
  const [price, setPrice] = useState("100");
  const [discount, setDiscount] = useState("20");
  const [extra, setExtra] = useState("");
  const [tax, setTax] = useState("");

  const base = Math.max(0, parseFloat(price) || 0);
  const d1 = Math.min(100, Math.max(0, parseFloat(discount) || 0));
  const d2 = Math.min(100, Math.max(0, parseFloat(extra) || 0));
  const t = Math.max(0, parseFloat(tax) || 0);

  // Stacked discounts apply one after another, not added together.
  const afterDiscounts = base * (1 - d1 / 100) * (1 - d2 / 100);
  const total = afterDiscounts * (1 + t / 100);
  const saved = base - afterDiscounts;
  const effective = base > 0 ? (saved / base) * 100 : 0;

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div className="grid gap-4">
        <Field id="price" label="Original price ($)" value={price} onChange={setPrice} />
        <Field id="discount" label="Discount (%)" value={discount} onChange={setDiscount} />
        <Field id="extra" label="Extra discount (%) — optional" value={extra} onChange={setExtra} placeholder="e.g. coupon on top of sale" />
        <Field id="tax" label="Sales tax (%) — optional" value={tax} onChange={setTax} placeholder="e.g. 8.25" />
      </div>

      <div className="flex flex-col justify-center rounded-xl bg-brand-soft/50 p-6">
        <p className="text-sm font-medium text-muted">You pay</p>
        <p className="mt-1 text-4xl font-extrabold tracking-tight">{money(total)}</p>
        <dl className="mt-6 grid gap-2 text-sm">
          <Row label="You save" value={money(saved)} highlight />
          <Row label="Effective discount" value={`${effective.toFixed(1)}%`} />
          <Row label="Price before tax" value={money(afterDiscounts)} />
          {t > 0 && <Row label="Tax" value={money(total - afterDiscounts)} />}
        </dl>
      </div>
    </div>
  );
}

function Field({
  id, label, value, onChange, placeholder,
}: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        min="0"
        className="input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={highlight ? "font-bold text-brand" : "font-medium"}>{value}</dd>
    </div>
  );
}

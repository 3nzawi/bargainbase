"use client";

import { useEffect, useState } from "react";
import { CopyButton } from "@/components/CopyButton";

const sets = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  digits: "23456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?",
};
type SetName = keyof typeof sets;

// Unbiased random index using the Web Crypto API (rejection sampling).
function randomIndex(max: number) {
  const limit = Math.floor(0x100000000 / max) * max;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf);
  while (buf[0] >= limit);
  return buf[0] % max;
}

function generate(length: number, enabled: SetName[]) {
  const pools = enabled.map((s) => sets[s]);
  const all = pools.join("");
  // Guarantee at least one character from each chosen set, then shuffle.
  const chars = pools.map((p) => p[randomIndex(p.length)]);
  while (chars.length < length) chars.push(all[randomIndex(all.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join("");
}

function strength(length: number, poolSize: number) {
  const bits = length * Math.log2(poolSize || 1);
  if (bits < 50) return { label: "Weak", pct: 25, color: "bg-red-500" };
  if (bits < 70) return { label: "Fair", pct: 50, color: "bg-amber-500" };
  if (bits < 100) return { label: "Strong", pct: 75, color: "bg-emerald-500" };
  return { label: "Very strong", pct: 100, color: "bg-emerald-600" };
}

export function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [enabled, setEnabled] = useState<Record<SetName, boolean>>({
    lower: true, upper: true, digits: true, symbols: true,
  });
  const [password, setPassword] = useState("");

  const active = (Object.keys(sets) as SetName[]).filter((s) => enabled[s]);

  const regenerate = (len = length, on = enabled) => {
    const names = (Object.keys(sets) as SetName[]).filter((s) => on[s]);
    setPassword(names.length ? generate(len, names) : "");
  };

  // Generate the first password after mount (crypto isn't available during server prerender).
  useEffect(() => {
    const id = requestAnimationFrame(() => setPassword(generate(16, Object.keys(sets) as SetName[])));
    return () => cancelAnimationFrame(id);
  }, []);

  const s = strength(length, active.reduce((n, k) => n + sets[k].length, 0));

  return (
    <div className="grid gap-6">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
        <code className="flex-1 break-all font-mono text-lg">{password || "Pick at least one character type"}</code>
        <button type="button" onClick={() => regenerate()} className="btn-ghost px-3 py-1.5 text-xs" aria-label="Generate new password">
          ↻ New
        </button>
        <CopyButton value={password} />
      </div>

      {password && (
        <div>
          <div className="h-2 overflow-hidden rounded-full bg-border">
            <div className={`h-full ${s.color} transition-all`} style={{ width: `${s.pct}%` }} />
          </div>
          <p className="mt-1.5 text-sm text-muted">{s.label}</p>
        </div>
      )}

      <div>
        <label htmlFor="pw-length" className="label">Length: {length}</label>
        <input
          id="pw-length"
          type="range"
          min={8}
          max={64}
          value={length}
          onChange={(e) => {
            const len = Number(e.target.value);
            setLength(len);
            regenerate(len);
          }}
          className="w-full accent-brand"
        />
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {([
          ["lower", "Lowercase (a–z)"],
          ["upper", "Uppercase (A–Z)"],
          ["digits", "Numbers (2–9)"],
          ["symbols", "Symbols (!@#…)"],
        ] as [SetName, string][]).map(([key, label]) => (
          <label key={key} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-3 text-sm hover:border-brand">
            <input
              type="checkbox"
              checked={enabled[key]}
              onChange={(e) => {
                const next = { ...enabled, [key]: e.target.checked };
                setEnabled(next);
                regenerate(length, next);
              }}
              className="h-4 w-4 accent-brand"
            />
            {label}
          </label>
        ))}
      </div>
      <p className="text-xs text-muted">Look-alike characters (l, 1, O, 0) are excluded to avoid typos.</p>
    </div>
  );
}

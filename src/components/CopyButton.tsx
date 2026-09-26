"use client";

import { useState } from "react";

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked (e.g. insecure context); the value is still visible to copy manually.
    }
  }

  return (
    <button type="button" onClick={copy} className="btn px-3 py-1.5 text-xs" disabled={!value}>
      {copied ? "Copied!" : label}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function QrGenerator() {
  const [text, setText] = useState("https://example.com");
  const [fg, setFg] = useState("#1c1917");
  const [bg, setBg] = useState("#ffffff");
  const [dataUrl, setDataUrl] = useState("");

  useEffect(() => {
    if (!text.trim()) return;
    let cancelled = false;
    QRCode.toDataURL(text, { width: 512, margin: 2, color: { dark: fg, light: bg } })
      .then((url) => !cancelled && setDataUrl(url))
      .catch(() => !cancelled && setDataUrl(""));
    return () => {
      cancelled = true;
    };
  }, [text, fg, bg]);

  const hasText = text.trim().length > 0;

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_auto]">
      <div className="grid content-start gap-4">
        <div>
          <label htmlFor="qr-text" className="label">Link or text</label>
          <textarea
            id="qr-text"
            rows={4}
            className="input resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste a URL, Wi-Fi password, phone number…"
          />
        </div>
        <div className="flex gap-6">
          <ColorField id="qr-fg" label="Foreground" value={fg} onChange={setFg} />
          <ColorField id="qr-bg" label="Background" value={bg} onChange={setBg} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex h-56 w-56 items-center justify-center overflow-hidden rounded-xl border border-border bg-white">
          {hasText && dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- data URL, nothing for next/image to optimize
            <img src={dataUrl} alt="Generated QR code" className="h-full w-full" />
          ) : (
            <span className="px-6 text-center text-sm text-stone-500">Enter text to generate a QR code</span>
          )}
        </div>
        <a
          href={hasText ? dataUrl : undefined}
          download="qr-code.png"
          aria-disabled={!hasText}
          className={`btn w-full ${hasText ? "" : "pointer-events-none opacity-50"}`}
        >
          Download PNG
        </a>
      </div>
    </div>
  );
}

function ColorField({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="label">{label}</label>
      <input
        id={id}
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-20 cursor-pointer rounded-lg border border-border bg-background p-1"
      />
    </div>
  );
}

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-brand" />
      <path
        d="M9 11.5a2.5 2.5 0 0 1 2.5-2.5h5.2c.66 0 1.3.26 1.77.73l5.3 5.3a2.5 2.5 0 0 1 0 3.54l-4.96 4.96a2.5 2.5 0 0 1-3.54 0l-5.3-5.3A2.5 2.5 0 0 1 9 16.46V11.5z"
        fill="white"
      />
      <circle cx="13" cy="13" r="1.6" className="fill-brand" />
    </svg>
  );
}

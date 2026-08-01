const FLAG: Record<string, string> = {
  us: "🇺🇸",
  ae: "🇦🇪",
  sa: "🇸🇦",
  qa: "🇶🇦",
  om: "🇴🇲",
  pk: "🇵🇰",
  in: "🇮🇳",
  za: "🇿🇦",
  ng: "🇳🇬",
  eg: "🇪🇬",
  eu: "🇪🇺",
  de: "🇩🇪",
  fr: "🇫🇷",
  es: "🇪🇸",
  pt: "🇵🇹",
};

type Props = {
  codes: readonly string[];
  className?: string;
};

export function RegionFlagStrip({ codes, className = "" }: Props) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`.trim()} aria-hidden>
      {codes.map((code) => (
        <span
          key={code}
          className="text-base leading-none sm:text-lg"
          title={code.toUpperCase()}
        >
          {FLAG[code] ?? "🏳️"}
        </span>
      ))}
    </span>
  );
}

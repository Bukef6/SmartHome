interface BlindPreviewProps {
  value: number; // 0–100
}

export function BlindPreview({ value }: BlindPreviewProps) {
  const slats = 10;
  const openness = Math.min(Math.max(value, 0), 100) / 100;

  return (
    <div className="relative w-full h-32 rounded-xl overflow-hidden bg-linear-to-br from-sky-300 to-sky-500">
      {[...Array(slats)].map((_, i) => (
        <div
          key={i}
          className="absolute left-0 w-full bg-neutral-900/80"
          style={{
            height: `${(100 / slats) * (1 - openness)}%`,
            top: `${i * (100 / slats)}%`,
            transition: "height 0.35s ease",
          }}
        />
      ))}

      <div className="absolute bottom-2 right-2 text-xs text-white/80 bg-black/40 px-2 py-1 rounded">
        {value}%
      </div>
    </div>
  );
}

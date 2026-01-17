interface IconCircleProps {
  size?: number;
  bgColor?: string;
  children: React.ReactNode;
}

export function IconCircle({
  size = 64,
  bgColor = "rgba(36,36,36,0.7)",
  children,
}: IconCircleProps) {
  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div
        className="absolute rounded-full"
        style={{ width: size, height: size, backgroundColor: bgColor }}
      ></div>
      <div className="relative z-8">{children}</div>
    </div>
  );
}

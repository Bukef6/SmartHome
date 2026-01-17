import "../css/shine.scss";
import LogoSrc from "../assets/logo.svg";
import { cn } from "../lib/utils";

export default function NewLogo({ className = "" }) {
  const base = "relative flex items-center justify-center overflow-hidden";
  return (
    <div className={cn(base, className)}>
      <img src={LogoSrc} className="p-2" alt="Logo" />
      {/* Shine efect */}
      <div className="absolute inset-0 -translate-x-full animate-shine bg-linear-to-r from-transparent via-gray-900/40 to-transparent transform-[skewX(-12deg)]" />
    </div>
  );
}

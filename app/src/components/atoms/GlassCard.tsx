import type { ReactNode } from "react";
import { glass } from "@/lib/glass";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  icon?: string;
}

export function GlassCard({ children, className = "", title, icon }: GlassCardProps) {
  return (
    <div className={`${glass.card} ${glass.cardHighlight} ${className}`}>
      {title && (
        <div className="flex items-center gap-2.5 px-6 pt-5 pb-1">
          {icon && <span className="text-lg">{icon}</span>}
          <h2 className="text-[13px] font-semibold uppercase tracking-wider text-text-tertiary">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}

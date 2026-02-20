import type { BriefStatData } from "@/types";

interface BriefStatProps {
  stat: BriefStatData;
}

const trendIcon: Record<string, string> = {
  up: "↑",
  down: "↓",
  neutral: "→",
};

const trendColor: Record<string, string> = {
  up: "text-accent-emerald",
  down: "text-accent-rose",
  neutral: "text-text-muted",
};

export function BriefStat({ stat }: BriefStatProps) {
  return (
    <div className="flex flex-col gap-1.5 rounded-xl bg-white/50 border border-glass-border px-4 py-3.5">
      <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
        {stat.label}
      </span>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
        {stat.trend && (
          <span className={`text-sm font-semibold pb-0.5 ${trendColor[stat.trend]}`}>
            {trendIcon[stat.trend]}
          </span>
        )}
      </div>
    </div>
  );
}

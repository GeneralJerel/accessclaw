import { GlassCard } from "@/components/atoms/GlassCard";
import { BriefStat } from "@/components/molecules/BriefStat";
import { dailyBrief } from "@data/dailyBrief";

export function DailyBriefCard() {
  return (
    <GlassCard>
      <div className="px-6 pt-6 pb-2">
        <p className="text-xs text-text-tertiary mb-1">{dailyBrief.date}</p>
        <h1 className="text-xl font-bold text-text-primary">
          {dailyBrief.greeting}
        </h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-6 py-4">
        {dailyBrief.stats.map((stat) => (
          <BriefStat key={stat.label} stat={stat} />
        ))}
      </div>

      <div className="mx-6 mb-6 rounded-xl bg-accent-blue/6 border border-accent-blue/12 px-4 py-3.5">
        <div className="flex items-start gap-2.5">
          <span className="text-accent-blue text-sm mt-0.5">⚡</span>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-blue">
              Top Priority
            </span>
            <p className="text-sm text-text-secondary mt-1 leading-relaxed">
              {dailyBrief.topPriority}
            </p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

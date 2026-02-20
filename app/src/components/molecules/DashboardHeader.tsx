import { dailyBrief } from "@data/dailyBrief";

export type DashboardTab = "briefing" | "clients" | "emails" | "todos";
export type PriorityFilter = "all" | "high" | "medium" | "low";

interface DashboardHeaderProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
  activeFilter: PriorityFilter;
  onFilterChange: (filter: PriorityFilter) => void;
}

const tabs: { id: DashboardTab; label: string; icon: string }[] = [
  { id: "briefing", label: "Briefing", icon: "📋" },
  { id: "clients", label: "Clients", icon: "👥" },
  { id: "emails", label: "Emails", icon: "📧" },
  { id: "todos", label: "To-Dos", icon: "✅" },
];

const filters: { id: PriorityFilter; label: string }[] = [
  { id: "all", label: "Priority" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
];

export function DashboardHeader({
  activeTab,
  onTabChange,
  activeFilter,
  onFilterChange,
}: DashboardHeaderProps) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs text-text-tertiary mb-1">{dailyBrief.date}</p>
        <h1 className="text-2xl font-bold text-text-primary">
          {dailyBrief.greeting}
        </h1>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-glass-border bg-white/60 backdrop-blur-xl px-4 py-3">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-muted shrink-0"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
        />
      </div>

      <div className="flex items-center gap-6 border-b border-glass-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-accent-warm after:absolute after:bottom-0 after:inset-x-0 after:h-0.5 after:bg-accent-warm after:rounded-full"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            <span className="text-base">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="text-xs text-text-tertiary mr-1">Sort by:</span>
        {filters.map((filter) => (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeFilter === filter.id
                ? "bg-text-primary text-white shadow-sm"
                : "bg-white/60 text-text-secondary border border-glass-border hover:bg-white/80"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
    </div>
  );
}

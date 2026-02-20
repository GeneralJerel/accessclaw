import { glass } from "@/lib/glass";

type Priority = "high" | "medium" | "low";

interface ActionCardProps {
  priority: Priority;
  timestamp: string;
  title: string;
  description?: string;
  actionLabel?: string;
  icon?: string;
  onAction?: () => void;
}

const priorityStyles: Record<Priority, string> = {
  high: "bg-urgency-high/12 text-urgency-high border-urgency-high/20",
  medium: "bg-urgency-medium/12 text-urgency-medium border-urgency-medium/20",
  low: "bg-urgency-low/12 text-urgency-low border-urgency-low/20",
};

const priorityLabel: Record<Priority, string> = {
  high: "High Priority",
  medium: "Medium Priority",
  low: "Low Priority",
};

export function ActionCard({
  priority,
  timestamp,
  title,
  description,
  actionLabel,
  icon,
  onAction,
}: ActionCardProps) {
  return (
    <div className={`${glass.card} ${glass.cardHover} p-5 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${priorityStyles[priority]}`}
          >
            {priorityLabel[priority]}
          </span>
          <span className="flex items-center gap-1 text-[11px] text-text-tertiary">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-60"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {timestamp}
          </span>
        </div>
        {icon && (
          <span className="text-2xl leading-none shrink-0">{icon}</span>
        )}
      </div>

      <h3 className="text-base font-semibold text-text-primary leading-snug">
        {title}
      </h3>

      {description && (
        <p className="text-sm text-text-tertiary leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="mt-1 self-start rounded-lg bg-accent-warm px-4 py-2 text-xs font-semibold text-white transition-all hover:bg-accent-warm/90 hover:shadow-sm active:scale-[0.98]"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

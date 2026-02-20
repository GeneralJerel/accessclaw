interface BadgeProps {
  label: string;
  variant: "active" | "pending" | "at-risk" | "high" | "medium" | "low";
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  active: "bg-status-active/10 text-status-active border-status-active/20",
  pending: "bg-status-pending/10 text-status-pending border-status-pending/20",
  "at-risk": "bg-status-at-risk/10 text-status-at-risk border-status-at-risk/20",
  high: "bg-urgency-high/10 text-urgency-high border-urgency-high/20",
  medium: "bg-urgency-medium/10 text-urgency-medium border-urgency-medium/20",
  low: "bg-urgency-low/10 text-urgency-low border-urgency-low/20",
};

export function Badge({ label, variant }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold capitalize ${variantStyles[variant]}`}
    >
      {label}
    </span>
  );
}

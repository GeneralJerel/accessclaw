interface StatusDotProps {
  status: "active" | "pending" | "at-risk";
}

const dotColor: Record<StatusDotProps["status"], string> = {
  active: "bg-status-active",
  pending: "bg-status-pending",
  "at-risk": "bg-status-at-risk",
};

export function StatusDot({ status }: StatusDotProps) {
  return (
    <span className="relative flex h-2.5 w-2.5">
      {status === "at-risk" && (
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${dotColor[status]} opacity-50`}
        />
      )}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${dotColor[status]}`} />
    </span>
  );
}

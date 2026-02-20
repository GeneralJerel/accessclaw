import type { Client } from "@/types";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { StatusDot } from "@/components/atoms/StatusDot";

interface ClientRowProps {
  client: Client;
}

const statusLabel: Record<Client["status"], string> = {
  active: "Active",
  pending: "Pending",
  "at-risk": "At Risk",
};

export function ClientRow({ client }: ClientRowProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-glass-5 cursor-default">
      <Avatar initials={client.avatarInitials} size="sm" />
      <div className="flex flex-1 min-w-0 items-center gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary truncate">
              {client.name}
            </span>
            <StatusDot status={client.status} />
          </div>
          <span className="text-xs text-text-tertiary">{client.company}</span>
        </div>
        <div className="hidden sm:flex flex-col items-end gap-0.5">
          <span className="text-sm font-semibold text-text-primary">{client.monthlyValue}</span>
          <span className="text-[11px] text-text-tertiary">{client.lastContact}</span>
        </div>
        <Badge label={statusLabel[client.status]} variant={client.status} />
      </div>
    </div>
  );
}

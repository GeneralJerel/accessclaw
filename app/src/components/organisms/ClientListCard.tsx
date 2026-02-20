import { GlassCard } from "@/components/atoms/GlassCard";
import { ClientRow } from "@/components/molecules/ClientRow";
import { clients } from "@data/clients";

export function ClientListCard() {
  return (
    <GlassCard title="Clients" icon="👥">
      <div className="divide-y divide-glass-border mt-2 pb-3">
        {clients.map((client) => (
          <ClientRow key={client.id} client={client} />
        ))}
      </div>
    </GlassCard>
  );
}

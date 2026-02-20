import { GlassCard } from "@/components/atoms/GlassCard";
import { EmailRow } from "@/components/molecules/EmailRow";
import { emails } from "@data/emails";

export function EmailListCard() {
  return (
    <GlassCard title="Emails to Review" icon="📧">
      <div className="divide-y divide-glass-border mt-2 pb-3">
        {emails.map((email) => (
          <EmailRow key={email.id} email={email} />
        ))}
      </div>
    </GlassCard>
  );
}

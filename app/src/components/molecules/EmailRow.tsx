import type { Email } from "@/types";
import { Badge } from "@/components/atoms/Badge";

interface EmailRowProps {
  email: Email;
}

export function EmailRow({ email }: EmailRowProps) {
  return (
    <div
      className={`flex flex-col gap-1.5 px-6 py-3.5 transition-colors hover:bg-glass-5 cursor-default ${
        !email.isRead ? "border-l-2 border-l-accent-blue" : "border-l-2 border-l-transparent"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <span
            className={`text-sm truncate ${
              email.isRead ? "text-text-tertiary font-normal" : "text-text-primary font-medium"
            }`}
          >
            {email.sender}
          </span>
          <Badge label={email.urgency} variant={email.urgency} />
        </div>
        <span className="text-[11px] text-text-tertiary shrink-0">{email.receivedAt}</span>
      </div>
      <p
        className={`text-sm truncate ${
          email.isRead ? "text-text-tertiary" : "text-text-secondary"
        }`}
      >
        <span className={email.isRead ? "" : "font-medium text-text-primary"}>
          {email.subject}
        </span>
        {" — "}
        {email.preview}
      </p>
    </div>
  );
}

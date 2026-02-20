import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  DashboardHeader,
  type DashboardTab,
  type PriorityFilter,
} from "@/components/molecules/DashboardHeader";
import { ActionCard } from "@/components/molecules/ActionCard";
import { BriefStat } from "@/components/molecules/BriefStat";
import { dailyBrief } from "@data/dailyBrief";
import { clients } from "@data/clients";
import { emails } from "@data/emails";
import { todos } from "@data/todos";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const clientActionMap: Record<string, string> = {
  pending: "Follow Up",
  active: "View Details",
  "at-risk": "Resolve Now",
};

const emailActionMap: Record<string, string> = {
  high: "Reply Now",
  medium: "Review",
  low: "Read Later",
};

function Dashboard() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("briefing");
  const [activeFilter, setActiveFilter] = useState<PriorityFilter>("all");

  const filteredClients = clients
    .map((c) => {
      const priority = c.status === "at-risk" ? "high" as const : c.status === "pending" ? "medium" as const : "low" as const;
      return { ...c, priority };
    })
    .filter((c) => activeFilter === "all" || c.priority === activeFilter);

  const filteredEmails = emails.filter(
    (e) => activeFilter === "all" || e.urgency === activeFilter,
  );

  const filteredTodos = todos.filter(
    (t) => activeFilter === "all" || t.priority === activeFilter,
  );

  return (
    <div className="min-h-screen px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <DashboardHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mt-6">
          {activeTab === "briefing" && (
            <>
              <ActionCard
                priority="high"
                timestamp="Now"
                title="Top Priority"
                description={dailyBrief.topPriority}
                actionLabel="Take Action"
                icon="⚡"
              />
              {dailyBrief.stats.map((stat) => (
                <BriefStat key={stat.label} stat={stat} />
              ))}
            </>
          )}

          {activeTab === "clients" &&
            filteredClients.map((client) => (
              <ActionCard
                key={client.id}
                priority={client.priority}
                timestamp={client.lastContact}
                title={`${client.name} — ${client.company}`}
                description={`Monthly value: ${client.monthlyValue}`}
                actionLabel={clientActionMap[client.status]}
                icon="👤"
              />
            ))}

          {activeTab === "emails" &&
            filteredEmails.map((email) => (
              <ActionCard
                key={email.id}
                priority={email.urgency}
                timestamp={email.receivedAt}
                title={email.subject}
                description={`${email.sender} — ${email.preview}`}
                actionLabel={emailActionMap[email.urgency]}
                icon="✉️"
              />
            ))}

          {activeTab === "todos" &&
            filteredTodos.map((todo) => (
              <ActionCard
                key={todo.id}
                priority={todo.priority}
                timestamp={todo.dueDate ?? "No date"}
                title={todo.text}
                actionLabel={todo.completed ? "Done" : "Mark Complete"}
                icon={todo.completed ? "✅" : "⬜"}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

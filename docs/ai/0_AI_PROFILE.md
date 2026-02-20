# AI Engineering Profile — AI Chief of Staff

> Last updated: 2026-02-19

---

## Agent Architecture

The AI Chief of Staff operates as a multi-agent system orchestrated by **OpenClaw**, with individual agent workflows defined in **Wordware**. Agent state is streamed to the frontend via the **AG-UI** protocol and rendered through **CopilotKit** components.

---

## Agent Workflows

| Workflow | Trigger | Actions | Output |
|----------|---------|---------|--------|
| **Email Triage** | New email received / periodic scan | Classify priority, extract action items, identify sender context | Prioritized inbox view + draft responses |
| **Follow-Up Engine** | Timer-based / relationship state change | Check last contact date, evaluate relationship health, determine outreach type | Queued follow-up drafts for review |
| **Invoice Manager** | Project milestone / manual trigger / schedule | Generate invoice from project data, send, track payment status, chase overdue | Invoice sent or chase email drafted |
| **Schedule Negotiator** | Incoming meeting request / user command | Parse availability, propose times, handle back-and-forth, book confirmed slot | Calendar event created |

---

## Prompt Design Principles

1. **Voice Matching** — All outbound drafts mirror the user's communication style (tone, formality, signature patterns)
2. **Context Accumulation** — Agents maintain rolling context of client history, project status, and communication patterns
3. **Conservative Defaults** — Agents default to drafting for review rather than sending autonomously; autonomy is earned through user trust settings
4. **Explainable Actions** — Every agent action includes a brief rationale visible in the UI ("Drafting follow-up because last contact with [Client] was 5 days ago and proposal is pending")

---

## AG-UI Event Model

The AG-UI protocol streams structured events from agents to the frontend:

| Event Type | Description |
|------------|-------------|
| `action_started` | Agent begins a new task |
| `draft_created` | A draft (email, invoice, etc.) is ready for review |
| `action_completed` | Task finished successfully |
| `action_paused` | Agent waiting for user input or approval |
| `context_updated` | Agent's understanding of a client/project has changed |
| `error` | Something went wrong; surfaced for user attention |

---

## Trust & Control Model

| Trust Level | Behavior |
|-------------|----------|
| **Review Everything** (default) | All drafts queued for approval before any action |
| **Trust Routine** | Routine follow-ups and scheduling auto-sent; new client communications reviewed |
| **Full Autonomy** | Agent acts independently; user notified post-action with undo window |

Users can set trust levels globally or per-workflow. The system tracks agent accuracy over time and surfaces a "trust score" to help users decide when to increase autonomy.

---

## LLM Configuration (Planned)

| Parameter | Approach |
|-----------|----------|
| **Model Selection** | Defined per-workflow in Wordware; heavier models for drafting, lighter for classification |
| **Temperature** | Low (0.2–0.4) for business communication; moderate (0.5–0.7) for creative suggestions |
| **Context Window** | Managed by OpenClaw; relevant client history injected per-task |
| **Fallback** | If primary model fails, degrade gracefully to simpler action + user notification |

---

## Data & Privacy Considerations

- User data (emails, invoices, calendar) processed in-session; no training on user data
- All agent actions logged and auditable by the user
- Sensitive fields (payment info, personal details) flagged and handled with extra caution
- Users can export or delete all their data at any time

---

## Status

🚧 Workflow definitions in progress. AG-UI event model being mapped.

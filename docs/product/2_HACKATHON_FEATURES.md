# Hackathon Feature List — AI Chief of Staff (Claw)

> Last updated: 2026-02-19

---

## Scope

Features to build and demo for the hackathon. Each feature is a self-contained milestone with clear deliverables.

---

## Technology Stack & References

| Technology | Role | Reference |
|------------|------|-----------|
| **Wordware** | Prompt logic and LLM workflow definitions — email triage, follow-up decisions, invoice generation, schedule negotiation | Wordware workflows define the decision trees and business logic that power each agent capability |
| **AG-UI** | Agent-UI protocol — real-time SSE streaming of agent state (actions, drafts, tool calls) from backend to frontend | `@ag-ui/client` + `@ag-ui/core` — event types: `RUN_STARTED`, `TEXT_MESSAGE_*`, `TOOL_CALL_*`, `RUN_FINISHED` |
| **OpenClaw** | Agent orchestration — multi-step workflow management, task routing, state management, context window injection | Gateway handles agent routing, dispatch, and reply pipeline across channels |
| **ClawGUI (clawg-ui)** | OpenClaw channel plugin that exposes the gateway as an AG-UI-compatible HTTP endpoint at `/v1/clawg-ui` | `@contextableai/clawg-ui` — bridges AG-UI clients (CopilotKit, `HttpAgent`) to OpenClaw gateway via SSE |

### How They Connect

```
┌──────────────────────┐
│  Frontend (React)    │
│  CopilotKit UI       │◄──── AG-UI SSE Events ────┐
│  @ag-ui/client       │                            │
└──────────┬───────────┘                            │
           │ POST /v1/clawg-ui                      │
           ▼                                        │
┌──────────────────────┐                            │
│  ClawGUI Plugin      │── streams responses ───────┘
│  (clawg-ui channel)  │
│  Device-paired auth  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  OpenClaw Gateway    │
│  Task Router         │
│  State Manager       │
│  Workflow Coordinator│
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  Wordware Workflows  │
│  Email Triage        │
│  Follow-Up Engine    │
│  Invoice Manager     │
│  Schedule Negotiator │
└──────────────────────┘
```

### Integration Notes for Hackathon

- **Frontend → ClawGUI**: CopilotKit's `runtimeUrl` points to `/v1/clawg-ui`; device pairing provides auth
- **ClawGUI → OpenClaw**: Plugin auto-registers as a channel; parses AG-UI `RunAgentInput` into OpenClaw inbound context
- **OpenClaw → Wordware**: Gateway routes to the appropriate agent; Wordware workflows execute the LLM logic per-task
- **Mock-first**: During hackathon Phase 1, the frontend uses mock data in `/data`; ClawGUI + OpenClaw integration lands in Phase 2

---

## Feature 1 — Setting Up Claw

**Goal:** First-run onboarding that takes a freelancer from zero to a personalized Claw in under 5 minutes.

| Item | Detail |
|------|--------|
| **Screen** | Multi-step onboarding wizard |
| **Steps** | 1. Who Are You (name, business type, revenue range) → 2. Connect Your World (integration cards) → 3. Set Trust Level → 4. Meet Claw |
| **Key Interactions** | Progressive disclosure, one-tap OAuth connect, skip-for-now option, animated transition into dashboard |
| **Empty State** | If no integrations connected, land in guided empty environment with contextual CTAs |
| **Demo Deliverable** | Fully navigable onboarding flow with mock OAuth and trust-level selector |

### Acceptance Criteria

- [ ] 4-step onboarding wizard renders and navigates correctly
- [ ] Business type dropdown and revenue range selector functional
- [ ] Integration cards show connected / not-connected state
- [ ] Trust level selection persists to user profile
- [ ] "Meet Claw" screen displays personalized welcome message
- [ ] Empty environment renders with guided CTAs when nothing is connected

---

## Feature 2 — Integrating Gmail, Calendar, etc.

**Goal:** Connect external accounts so Claw has the context it needs to operate.

| Item | Detail |
|------|--------|
| **Screen** | Integration settings panel (accessible from onboarding + settings) |
| **Integrations** | Gmail (read/send), Google Calendar (read/write), future: Stripe, QuickBooks |
| **Flow** | Tap card → OAuth consent → callback → confirmation badge |
| **State Management** | Track per-integration: `disconnected` → `connecting` → `connected` → `error` |
| **Demo Deliverable** | Integration cards with mock OAuth flow, status badges, and disconnect option |

### Acceptance Criteria

- [ ] Gmail integration card triggers OAuth flow (mock for hackathon)
- [ ] Google Calendar integration card triggers OAuth flow (mock for hackathon)
- [ ] Connected integrations show green badge + "Connected" label
- [ ] Disconnect button resets integration to `disconnected` state
- [ ] Error state displays retry option with helpful message
- [ ] Integration status visible from both onboarding and settings page

---

## Feature 3 — Getting Daily Briefings

**Goal:** Every morning, Claw delivers a natural-language summary of what matters today — no digging required.

| Item | Detail |
|------|--------|
| **Screen** | Daily Brief card on the Dashboard |
| **Content** | Natural-language summary: emails needing replies, overdue invoices, client follow-up gaps, today's calendar events |
| **Stats Row** | Quick-glance chips: pending emails, revenue this month, active clients, tasks due |
| **Interaction** | Tap any stat chip → jump to that section; tap brief → expanded detail view |
| **Timing** | Generated at configured time (default: 8 AM local); refreshable on demand |
| **Demo Deliverable** | Dashboard with populated daily brief card, stat chips, and expand behavior |

### Acceptance Criteria

- [ ] Daily Brief card renders with natural-language summary from mock data
- [ ] Stat chips (emails, revenue, clients, tasks) display correct counts
- [ ] Tapping a stat chip scrolls/navigates to the relevant dashboard section
- [ ] Expanded brief view shows detailed breakdown per category
- [ ] Pull-to-refresh (mobile) or refresh button regenerates the brief
- [ ] Brief adapts content based on connected integrations (hides calendar section if no calendar connected)

---

## Feature 4 — Email Summary

**Goal:** Surface the emails that actually matter, pre-triaged and prioritized by Claw, with draft replies ready to approve.

| Item | Detail |
|------|--------|
| **Screen** | Emails card on Dashboard + full Email Triage view |
| **Dashboard Card** | Top 3–5 emails ranked by urgency (red / yellow / gray indicators) |
| **Triage View** | Full inbox sorted by AI priority; each row shows sender, subject, Claw's one-line summary, urgency tag |
| **Actions per Email** | Preview → AI-drafted reply in drawer; Approve / Edit / Dismiss |
| **Smart Filters** | Needs Reply, Waiting On, FYI Only, Archived |
| **Demo Deliverable** | Dashboard email card + triage view with mock emails, priority tags, and draft reply previews |

### Acceptance Criteria

- [ ] Emails card on dashboard shows top prioritized emails with urgency indicators
- [ ] Tapping an email opens inline preview with Claw's summary
- [ ] AI-drafted reply is available for each email needing a response
- [ ] Approve sends the draft (mock); Edit opens inline editor; Dismiss archives
- [ ] Full triage view accessible via "View Inbox →" link
- [ ] Smart filters (Needs Reply, Waiting On, FYI Only) toggle correctly
- [ ] Email count badge on dashboard reflects unhandled email count

---

## Hackathon Priority Matrix

| Feature | Priority | Effort | Demo Impact | Key Tech |
|---------|----------|--------|-------------|----------|
| Setting Up Claw | P0 | Medium | High — first impression | Frontend (mock) |
| Integrating Gmail, Calendar | P0 | Medium | High — unlocks all other features | Frontend (mock OAuth) → ClawGUI in Phase 2 |
| Getting Daily Briefings | P0 | Low | High — core value prop in one card | Wordware (brief generation) via OpenClaw |
| Email Summary | P0 | Medium | High — tangible AI-in-action moment | Wordware (triage + drafts) → AG-UI (streaming) → ClawGUI |

---

## Demo Flow (Suggested Order)

```
1. Setting Up Claw
   "Meet our user, a freelance designer making $15K/month…"
   → Walk through onboarding

2. Integrating Gmail & Calendar
   "She connects her Gmail and Google Calendar…"
   → Show OAuth cards flipping to connected state
   → Mention: "Under the hood, ClawGUI pairs her device with the OpenClaw gateway"

3. Getting Daily Briefings
   "Next morning, Claw greets her with this…"
   → Show dashboard with populated daily brief
   → Mention: "Wordware workflows analyzed her inbox overnight via OpenClaw"

4. Email Summary
   "Three emails need attention. Claw already drafted replies…"
   → Show email triage, preview a draft, approve it
   → Mention: "Drafts stream in real-time via AG-UI — she sees Claw thinking"
```

---

## Mock Data Architecture

Mock data lives in `/mock-data` as a Firebase-style NoSQL in-memory database with 6 collections.

| Collection | Documents | Status |
|------------|-----------|--------|
| `inbox` | 8 emails (inbound + outbound, threaded, with AI metadata) | Seeded |
| `calendar` | 6 events (calls, deep work, routine, prep blocks) | Seeded |
| `clients` | 4 client profiles with status and last contact | Seeded |
| `invoices` | 4 invoices (paid, outstanding, pending-proposal) | Seeded |
| `tasks` | 4 tasks with priorities, due dates, and linked entities | Seeded |
| `dailyBriefs` | 1 full natural-language morning brief with sections | Seeded |

The db supports `getAll`, `get`, `add`, `update`, `remove`, `query`, and `subscribe`. The `sendEmail()` helper appends new emails to the inbox at runtime (e.g. when the user clicks "Approve & Send").

See `/docs/engineering/3_MOCK_DATABASE.md` for full API reference.

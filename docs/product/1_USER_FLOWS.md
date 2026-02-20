# User Flows — AI Chief of Staff

> Last updated: 2026-02-19

---

## 1. Setup Claw (Onboarding)

**Goal:** Get the freelancer from zero to a personalized AI Chief of Staff in under 10 minutes.

**Principle:** Progressive disclosure — ask only what's needed now, learn the rest over time.

---

### Flow

```
[Landing / Sign Up]
       │
       ▼
┌─────────────────────────────────┐
│  Step 1 — Who Are You?          │
│                                 │
│  • Name                         │
│  • Business type (dropdown)     │
│    consultant / designer /      │
│    developer / writer / coach / │
│    other                        │
│  • Approx. monthly revenue      │
│    (range selector)             │
│                                 │
│  [Continue →]                   │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Step 2 — Connect Your World    │
│                                 │
│  Integration cards:             │
│  ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Email │ │Cal   │ │Inv   │   │
│  │ ☐    │ │ ☐    │ │ ☐    │   │
│  └──────┘ └──────┘ └──────┘   │
│                                 │
│  Each card: icon + one-tap      │
│  OAuth connect                  │
│                                 │
│  "Skip for now" link at bottom  │
│  (leads to empty environment)   │
│                                 │
│  [Continue →]                   │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Step 3 — Set Your Trust Level  │
│                                 │
│  Visual slider / radio:         │
│                                 │
│  ○ Review Everything (default)  │
│    "I approve every action"     │
│                                 │
│  ○ Trust Routine                │
│    "Auto-send routine items,    │
│     review new contacts"        │
│                                 │
│  ○ Full Autonomy                │
│    "Act freely, notify me after"│
│                                 │
│  Brief explainer text per       │
│  option, no jargon              │
│                                 │
│  [Launch Claw →]                │
└─────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────┐
│  Step 4 — Meet Claw             │
│                                 │
│  Animated transition into the   │
│  Dashboard. Claw introduces     │
│  itself in the Chat Sidebar:    │
│                                 │
│  "Hey [Name], I'm Claw. I've   │
│   started scanning your inbox.  │
│   Here's what I found so far…"  │
│                                 │
│  → Leads to Dashboard (Flow 3)  │
│     or Empty Environment        │
│     (Flow 2) if nothing         │
│     connected                   │
└─────────────────────────────────┘
```

### Key UX Decisions

| Decision | Rationale |
|----------|-----------|
| 4 steps max | Respect the user's time; every extra step risks drop-off |
| "Skip for now" on integrations | Don't block onboarding — empty environment is designed to still feel useful |
| Trust level early | Sets expectations immediately; reduces anxiety about AI acting on their behalf |
| Claw speaks first | The product feels alive from moment one; not a dead dashboard waiting for input |

---

## 2. Empty Environment

**Goal:** Make a brand-new account with zero data feel purposeful, not hollow.

**Principle:** Guide, don't gate. Show what's possible while giving the user clear next actions.

---

### Flow

```
┌──────────────────────────────────────────────────────┐
│  Dashboard (Empty State)                              │
│                                                       │
│  ┌────────────────────────────────────────────┐      │
│  │  Daily Brief                                │      │
│  │                                             │      │
│  │  "Nothing here yet — connect your email     │      │
│  │   and I'll have your first brief ready      │      │
│  │   by tomorrow morning."                     │      │
│  │                                             │      │
│  │  [Connect Email]                            │      │
│  └────────────────────────────────────────────┘      │
│                                                       │
│  ┌──────────────────┐  ┌──────────────────────┐      │
│  │  Clients          │  │  Emails               │      │
│  │                   │  │                       │      │
│  │  illustration +   │  │  illustration +       │      │
│  │  "Add your first  │  │  "Connect your inbox  │      │
│  │   client"         │  │   to get started"     │      │
│  │                   │  │                       │      │
│  │  [+ Add Client]   │  │  [Connect Email]      │      │
│  └──────────────────┘  └──────────────────────┘      │
│                                                       │
│  ┌──────────────────┐  ┌──────────────────────┐      │
│  │  Tasks            │  │  Invoices             │      │
│  │                   │  │                       │      │
│  │  "No tasks yet.   │  │  "No invoices yet.    │      │
│  │   I'll create     │  │   Add a client and    │      │
│  │   them as work    │  │   I'll help you bill." │      │
│  │   comes in."      │  │                       │      │
│  │                   │  │  [+ Add Client]       │      │
│  │  [+ Create Task]  │  │                       │      │
│  └──────────────────┘  └──────────────────────┘      │
│                                                       │
│  ┌────────────────────────────────────────────┐      │
│  │  Chat Sidebar (collapsed / peek)            │      │
│  │                                             │      │
│  │  Claw: "Want me to walk you through what    │      │
│  │  I can do? Or just connect an account       │      │
│  │  and I'll take it from there."              │      │
│  │                                             │      │
│  │  Quick action chips:                        │      │
│  │  [Connect Email] [Add a Client] [Show Demo] │      │
│  └────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────┘
```

### Empty State Principles

| Principle | Implementation |
|-----------|---------------|
| **No blank screens** | Every card has a friendly message + one primary CTA |
| **Claw is present** | The chat sidebar offers help even with zero data — the AI feels "on" |
| **CTAs are contextual** | Each card's action leads to the most logical next step for that section |
| **Demo mode available** | "Show Demo" chip loads sample data so the user can explore the full experience before committing |
| **Single action per card** | One button per empty card — no decision fatigue |

### Progression Triggers

The empty environment transitions to the populated dashboard as data flows in:

```
Connect Email  ──→  Emails card populates
                    Daily Brief generates next morning
                    Tasks auto-extracted from emails

Add Client     ──→  Clients card populates
                    Relationship tracking begins
                    Invoice section becomes actionable

Calendar sync  ──→  Schedule section appears
                    Deep work blocks suggested
```

---

## 3. Freelancer Dashboard (Populated)

**Goal:** One screen that answers "What do I need to know and do right now?" every time the user opens the app.

**Principle:** Information hierarchy — most urgent at the top, expandable depth everywhere.

---

### Flow

```
┌──────────────────────────────────────────────────────────┐
│  Dashboard                                      [⚙] [👤] │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │  Daily Brief                              Today ▾│    │
│  │                                                   │    │
│  │  "3 emails need replies. 1 invoice overdue.       │    │
│  │   Sarah Chen hasn't heard from you in 6 days."    │    │
│  │                                                   │    │
│  │  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐ │    │
│  │  │Emails  │  │Revenue │  │Clients │  │Tasks   │ │    │
│  │  │  3     │  │ $12.4K │  │ 7      │  │  5     │ │    │
│  │  │pending │  │this mo │  │active  │  │due     │ │    │
│  │  └────────┘  └────────┘  └────────┘  └────────┘ │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
│  ┌────────────────────────┐  ┌────────────────────────┐  │
│  │  Action Queue           │  │  Clients                │  │
│  │                         │  │                         │  │
│  │  Items Claw needs       │  │  ● Sarah Chen    6d ago │  │
│  │  your approval on:      │  │  ● Mike Torres   2d ago │  │
│  │                         │  │  ○ Acme Corp     today  │  │
│  │  ☐ Reply to Sarah       │  │  ○ Nova Labs     today  │  │
│  │    [Preview] [Approve]  │  │  ○ Jess Park     1d ago │  │
│  │                         │  │  ...                    │  │
│  │  ☐ Chase invoice #047   │  │                         │  │
│  │    [Preview] [Approve]  │  │  ● = needs attention    │  │
│  │                         │  │  ○ = healthy             │  │
│  │  ☐ Book call w/ Mike    │  │                         │  │
│  │    [Preview] [Approve]  │  │  [View All →]           │  │
│  │                         │  │                         │  │
│  │  [Approve All]          │  │                         │  │
│  └────────────────────────┘  └────────────────────────┘  │
│                                                           │
│  ┌────────────────────────┐  ┌────────────────────────┐  │
│  │  Emails                 │  │  Tasks                  │  │
│  │                         │  │                         │  │
│  │  Prioritized by Claw:   │  │  ☐ Send revised scope   │  │
│  │                         │  │  ☐ Review contract draft │  │
│  │  🔴 Sarah — re: scope   │  │  ☐ Prep weekly update   │  │
│  │  🟡 Mike — schedule     │  │  ☑ Invoice Acme Corp    │  │
│  │  ⚪ Newsletter — skip?  │  │  ☑ Follow up Nova Labs  │  │
│  │                         │  │                         │  │
│  │  [View Inbox →]         │  │  [View All →]           │  │
│  └────────────────────────┘  └────────────────────────┘  │
│                                                           │
│  ┌──────────────────────────────────────────────────┐    │
│  │  Agent Activity Feed                    [Live 🟢] │    │
│  │                                                   │    │
│  │  10:42 — Drafted reply to Sarah Chen              │    │
│  │  10:38 — Classified 12 new emails                 │    │
│  │  10:35 — Flagged invoice #047 as 3 days overdue   │    │
│  │  10:30 — Generated daily brief                    │    │
│  │                                                   │    │
│  │  [View Full Log →]                                │    │
│  └──────────────────────────────────────────────────┘    │
│                                                           │
│  ┌─ Chat Sidebar (slide-in) ─────────────────────────┐   │
│  │                                                    │   │
│  │  Claw: "Sarah's been waiting on the revised        │   │
│  │  scope. I drafted a reply — want to review it?"    │   │
│  │                                                    │   │
│  │  [Show Draft]  [Send It]  [I'll Handle It]         │   │
│  │                                                    │   │
│  │  ▌ Type a message...                               │   │
│  └────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

### Dashboard Sections (top → bottom priority)

| Section | Purpose | Expand Behavior |
|---------|---------|-----------------|
| **Daily Brief** | Morning snapshot — natural language summary + key stats | Tap any stat to jump to that section |
| **Action Queue** | Drafts and decisions awaiting user approval | Preview opens inline drawer; Approve sends immediately |
| **Clients** | Relationship health at a glance | Tap client → full client detail page (emails, invoices, history) |
| **Emails** | AI-prioritized inbox highlights | View Inbox → full email triage view |
| **Tasks** | Auto-extracted + manual to-dos | View All → task board with filters |
| **Agent Activity Feed** | Transparent log of everything Claw has done | Full Log → searchable, filterable activity history |

### Interaction Patterns

| Pattern | Behavior |
|---------|----------|
| **Inline Approve** | Approve an action directly from the dashboard without navigating away |
| **Preview Drawer** | Tap "Preview" to see the full draft in a slide-up panel; edit inline if needed |
| **Chat as Command** | Type natural language into the sidebar to redirect Claw ("Don't follow up with Sarah this week") |
| **Quick Action Chips** | Context-aware suggested actions appear in chat based on dashboard state |
| **Pull to Refresh** | Mobile: pull-to-refresh triggers a fresh brief and re-prioritization |

### State Transitions

```
Dashboard (populated)
    │
    ├── Tap stat in Daily Brief    → Jumps to relevant section
    ├── Tap [Preview] in Queue     → Inline drawer with draft
    │   ├── [Approve]              → Action executed, item removed
    │   ├── [Edit]                 → Inline editor, then approve
    │   └── [Dismiss]              → Item removed, Claw learns
    ├── Tap client name            → Client detail page
    ├── Tap email row              → Email detail / reply view
    ├── Tap [View Full Log]        → Agent activity history
    └── Chat sidebar message       → Claw responds / takes action
```

---

## Flow Relationship Map

```
┌─────────────┐     connected?     ┌─────────────────┐
│  Setup Claw  │──── yes ──────────▶│  Dashboard       │
│  (Onboarding)│                    │  (Populated)     │
└──────┬───────┘                    └─────────────────┘
       │                                    ▲
       │ no integrations                    │
       │ connected                          │ data flows in
       ▼                                    │
┌─────────────────┐                         │
│  Empty           │─── connect / add ──────┘
│  Environment     │
└─────────────────┘
```

---

## Shared UX Constants

| Constant | Value |
|----------|-------|
| Max onboarding steps | 4 |
| Max cards visible on dashboard without scroll | 6 |
| Default trust level | Review Everything |
| Empty state CTA count per card | 1 |
| Agent activity feed default visible items | 4 |
| Chat sidebar default state | Collapsed with peek message |

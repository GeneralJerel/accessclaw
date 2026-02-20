# Engineering Profile — AI Chief of Staff

> Last updated: 2026-02-19

---

## Tech Stack Overview

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Frontend Framework | **React** (via CopilotKit) | UI rendering and component architecture |
| Routing | **TanStack Router** | File-based routing |
| Agent-UI Protocol | **AG-UI** | Real-time streaming of agent state to frontend |
| Frontend Agent Components | **CopilotKit** | Pre-built UI for agent activity, inline editing, copilot interactions |
| Agent Orchestration | **OpenClaw** | Multi-step agent workflow management and task routing |
| Prompt Logic | **Wordware** | LLM workflow definitions, decision trees, business logic |

---

## Architecture

```
┌─────────────────────────────────────────────────┐
│                   Frontend                       │
│  CopilotKit UI ◄── AG-UI Protocol               │
│  (React + TanStack Router)                       │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│              Agent Orchestration                  │
│  OpenClaw                                        │
│  ├── Task Router                                 │
│  ├── State Manager                               │
│  └── Workflow Coordinator                        │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│              Prompt Logic Layer                   │
│  Wordware Workflows                              │
│  ├── Email Triage & Drafting                     │
│  ├── Follow-Up Decision Engine                   │
│  ├── Invoice Generation & Chase                  │
│  └── Schedule Negotiation                        │
└─────────────────────────────────────────────────┘
```

---

## Design Patterns

- **Atomic Design** — UI components structured as atoms → molecules → organisms → templates → pages
- **File-Based Routing** — TanStack Router with filesystem conventions
- **Mock-First Development** — `/mock-data` directory for all API responses until backend is built
- **Agent-Event Driven UI** — Frontend reacts to AG-UI event streams, not polling

---

## Project Structure (Planned)

```
hack-openclaw/
├── README.md
├── docs/
│   ├── product/          # Product documentation
│   ├── engineering/      # Technical documentation
│   └── ai/               # AI & prompt documentation
├── mock-data/            # Mock API responses
├── src/
│   ├── components/
│   │   ├── atoms/        # Buttons, inputs, badges
│   │   ├── molecules/    # Form groups, card headers
│   │   ├── organisms/    # Email list, invoice table, agent feed
│   │   ├── templates/    # Page layouts
│   │   └── pages/        # Route-level components
│   ├── routes/           # TanStack file-based routes
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilities, helpers, config
│   └── types/            # TypeScript type definitions
└── package.json
```

---

## Key Technical Decisions

| Decision | Rationale |
|----------|-----------|
| TanStack Router (file-based) | Clean route organization, type-safe, aligns with project conventions |
| CopilotKit for agent UI | Purpose-built for AI copilot interfaces; handles AG-UI consumption |
| Mock-data first | Frontend-first development; backend deferred until UX is validated |
| Atomic design | Composable, testable components; scales well for a dashboard-heavy app |

---

## Development Approach

1. **Phase 1 — Frontend & UX** (current): Build the full UI with mock data, validate UX flows
2. **Phase 2 — Agent Integration**: Connect OpenClaw orchestration and Wordware workflows
3. **Phase 3 — Backend & Integrations**: Real email/calendar/invoice API connections
4. **Phase 4 — Polish & Launch**: Trust/safety features, onboarding, production hardening

---

## Status

🚧 Phase 1 — Frontend scaffolding and mock data setup.

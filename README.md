# ChiefClaw 🦞

**Your ChiefClaw 🦞 for Freelancers**

---

## What is ChiefClaw?

ChiefClaw is an autonomous AI agent that runs the back-office operations of a freelancer's business — so they can focus on doing the work, not managing it. Powered by **OpenClaw**, ChiefClaw monitors your inbox, calendar, invoices, and task list around the clock, taking action on your behalf without you having to lift a finger.

Think of it as hiring a Chief of Staff that never sleeps.

---

## The Problem

Freelancers are solo operators wearing too many hats. Between responding to client emails, scheduling meetings, chasing invoices, and keeping track of tasks — hours disappear every week on administrative overhead that doesn't pay.

---

## The Solution

ChiefClaw gives every freelancer an AI agent — **OpenClaw** — that autonomously handles the operational layer of their business. When a client emails you, OpenClaw responds. When a meeting needs to be scheduled, OpenClaw sends the slots and sets the invite. Every morning, OpenClaw writes you a daily brief so you always know what's on your plate before your first coffee.

---

## Orchestration

**OpenClaw** controls **ChiefClaw** via **ClawGUI** — the bridge between the agent backend and the generative UI frontend.

```
┌──────────────────────────┐
│   ChiefClaw Frontend     │
│   CopilotKit + React     │◄──── AG-UI SSE Events ────┐
│   @ag-ui/client           │                            │
└───────────┬──────────────┘                            │
            │ POST /v1/clawg-ui                         │
            ▼                                           │
┌──────────────────────────┐                            │
│   ClawGUI Plugin         │── streams responses ───────┘
│   (clawg-ui channel)     │
│   Device-paired auth     │
└───────────┬──────────────┘
            │
            ▼
┌──────────────────────────┐
│   OpenClaw Gateway       │
│   Task Router            │
│   State Manager          │
│   Workflow Coordinator   │
└──────────────────────────┘
```

| Layer | Role |
|-------|------|
| **ChiefClaw Frontend** | React + CopilotKit generative UI — the freelancer's dashboard |
| **ClawGUI** | OpenClaw channel plugin that exposes the gateway as an AG-UI-compatible HTTP endpoint |
| **OpenClaw Gateway** | Agent orchestration — multi-step workflow management, task routing, state management |

---

## Core Features

| Feature | What OpenClaw Does |
|---------|-------------------|
| **Inbox Management** | Monitors your Gmail, drafts context-aware replies to clients, and keeps your inbox from becoming a to-do list |
| **Calendar Management** | Identifies scheduling requests, proposes available slots, and creates calendar invites for both parties automatically |
| **Invoice Management** | Tracks pending invoices, flags overdue payments, and keeps your finances visible without manual chasing |
| **Task Management** | Creates and updates tasks in your project management tool based on client conversations and commitments |
| **Daily Brief** | Every morning, generates a personalized briefing: what's urgent, what's pending, and what your day looks like — delivered as a clean, generative UI dashboard |

---

## Demo Scenario

> A client emails asking to connect. OpenClaw detects the intent, replies professionally with three available calendar slots, books the meeting once the client confirms, creates a task to prep for the call, and adds it to the freelancer's morning brief — all without the freelancer touching a single app.

```
1. Setting Up Claw
   "Meet our user, a freelance designer making $15K/month…"
   → Walk through onboarding

2. Integrating Gmail & Calendar
   "She connects her Gmail and Google Calendar…"
   → Show OAuth cards flipping to connected state
   → Under the hood, ClawGUI pairs her device with the OpenClaw gateway

3. Getting Daily Briefings
   "Next morning, Claw greets her with this…"
   → Show dashboard with populated daily brief
   → Wordware workflows analyzed her inbox overnight via OpenClaw

4. Email Summary
   "Three emails need attention. Claw already drafted replies…"
   → Show email triage, preview a draft, approve it
   → Drafts stream in real-time via AG-UI — she sees Claw thinking
```

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Wordware** | Agent orchestration — prompt logic and LLM workflow definitions |
| **CopilotKit + AG-UI** | Generative UI — real-time SSE streaming of agent state to frontend |
| **OpenClaw + ClawGUI** | Agent gateway — task routing, state management, AG-UI bridge |
| **Gmail + Google Calendar APIs** | Real integrations for email and scheduling |
| **React + Vite** | Frontend framework |
| **Vercel** | Deployment |
| **Jam.dev** | Bug tracking and QA |

---

## Project Structure

```
/src              → React frontend (CopilotKit, TanStack Router)
/mock-data        → Firebase-style in-memory mock database
/docs/product     → Product documentation
/docs/engineering → Technical documentation
/docs/ai          → AI & prompt documentation
```

---

## Connecting to OpenClaw

To use the Dashboard with the live OpenClaw agent (AI chat and tools):

1. **Run OpenClaw** with the clawg-ui plugin: `openclaw plugins install @contextableai/clawg-ui` then `openclaw gateway run` (default port **18789**).
2. **Get a device token** via pairing:  
   `curl -X POST http://localhost:18789/v1/clawg-ui -H "Content-Type: application/json" -d '{}'`  
   From the 403 response, copy the `token` and `pairingCode`. On the gateway machine run:  
   `openclaw pairing approve clawg-ui <pairingCode>`
3. In ChiefClaw **Dashboard**, paste the **device token** and click **Connect to OpenClaw**.

If you see "Connection Error", ensure OpenClaw is running, clawg-ui is enabled, the device is approved, and the gateway is on port 18789. Full steps: **docs/engineering/4_OPENCLAW_CONNECTION.md**.

---

## Getting Started

```bash
npm install
npm run dev
```

---

## Status

🚧 Hackathon build in progress — mock-first frontend with OpenClaw + ClawGUI integration landing in Phase 2.

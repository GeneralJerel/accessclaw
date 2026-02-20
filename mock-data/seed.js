/**
 * Seed data for the mock NoSQL database.
 * Structures existing scenario data into 5 Firebase-style collections:
 *   - dailyBriefs
 *   - inbox
 *   - invoices
 *   - tasks
 *   - calendar
 *
 * Also includes the freelancer profile and clients as supporting collections.
 */

// ─── Freelancer Profile (singleton) ──────────────────────────────────────────

export const freelancerProfile = {
  id: "usr_01",
  name: "Maya Chen",
  email: "maya@mayachendesign.com",
  businessName: "Maya Chen Design",
  businessType: "Brand & Product Design",
  revenueRange: "$10K–$20K/month",
  timezone: "America/Los_Angeles",
  activeClients: 4,
  trustLevel: "review-all",
  integrations: {
    gmail: { status: "connected", connectedAt: "2026-02-10T09:00:00Z" },
    googleCalendar: { status: "connected", connectedAt: "2026-02-10T09:02:00Z" },
    stripe: { status: "disconnected" },
    clickup: { status: "connected", connectedAt: "2026-02-12T14:30:00Z" },
    notion: { status: "connected", connectedAt: "2026-02-12T14:35:00Z" },
  },
  preferences: {
    dailyBriefTime: "08:00",
    emailCheckInterval: 60,
    deepWorkBlocks: ["10:00-12:00", "14:00-16:00"],
    responseVoice: "professional-warm",
  },
};

// ─── Collection: clients ─────────────────────────────────────────────────────

export const clientsSeed = [
  {
    id: "cli_01",
    name: "David Park",
    company: "Riviera Hospitality Group",
    email: "david.park@rivierahg.com",
    role: "VP of Marketing",
    status: "new-lead",
    lastContact: "2026-02-19T14:23:00Z",
    notes: "Inbound via website contact form. Needs full rebrand for boutique hotel chain.",
    estimatedValue: "$18,000",
  },
  {
    id: "cli_02",
    name: "Sarah Lin",
    company: "Nourish App",
    email: "sarah@nourishapp.io",
    role: "CEO & Founder",
    status: "active",
    lastContact: "2026-02-18T11:00:00Z",
    notes: "Ongoing product design retainer. Phase 2 UI refresh in progress.",
    estimatedValue: "$4,500/month",
  },
  {
    id: "cli_03",
    name: "Marcus Webb",
    company: "Archway Financial",
    email: "mwebb@archwayfinancial.com",
    role: "Director of Brand",
    status: "active",
    lastContact: "2026-02-17T16:45:00Z",
    notes: "Brand guidelines delivery due Friday. Final revisions pending.",
    estimatedValue: "$12,000",
  },
  {
    id: "cli_04",
    name: "Jessica Tran",
    company: "Bloom Collective",
    email: "jess@bloomcollective.co",
    role: "Creative Director",
    status: "follow-up-needed",
    lastContact: "2026-02-10T09:30:00Z",
    notes: "Proposal sent 9 days ago. No response. Past client — good relationship.",
    estimatedValue: "$7,500",
  },
];

// ─── Collection: dailyBriefs ─────────────────────────────────────────────────

export const dailyBriefsSeed = [
  {
    id: "brief_2026-02-20",
    date: "2026-02-20",
    generatedAt: "2026-02-20T08:00:00-08:00",
    generatedBy: "openclaw",
    greeting: "Good morning, Maya. Here's your Thursday rundown.",
    summary: `You have a busy but manageable day ahead. The big highlight is your intro call with David Park from Riviera Hospitality Group at 1 PM — a potential $18K rebrand project. I've already prepped an agenda and background notes for the call.

On the delivery side, Marcus at Archway Financial needs the brand guidelines revisions by tomorrow. You have a 2-hour deep work block this afternoon to tackle that. Sarah's Nourish App feedback was minor — just the background color tweak on the recipe detail page.

Cash flow update: $4,500 landed from Nourish App yesterday. The Archway invoice ($6,000) is due in 5 days and hasn't been paid yet — I'll send a gentle nudge tomorrow if it's still outstanding.

One flag: Jessica Tran at Bloom Collective hasn't responded to your proposal in 9 days. I'd recommend a warm follow-up today — I've drafted one for your review.`,
    stats: {
      pendingEmails: 3,
      revenueThisMonth: 16500,
      activeClients: 4,
      tasksDueToday: 4,
      overdueInvoices: 1,
    },
    sections: [
      {
        title: "Today's Schedule",
        icon: "calendar",
        items: [
          { time: "8:00 AM", label: "Daily Brief Review", type: "routine" },
          { time: "10:00 AM – 12:00 PM", label: "Deep Work — Nourish Phase 2", type: "deep-work" },
          { time: "1:00 PM", label: "Intro Call — David Park (Riviera Rebrand)", type: "client-call", highlight: true },
          { time: "2:00 PM – 4:00 PM", label: "Deep Work — Archway Guidelines", type: "deep-work" },
          { time: "4:30 PM", label: "Weekly Review & Planning", type: "routine" },
        ],
      },
      {
        title: "Emails Needing Attention",
        icon: "mail",
        items: [
          { label: "David Park — Rebrand intro (HANDLED)", status: "resolved", detail: "Responded with 3 calendar slots. David confirmed Thu 1 PM. Invite sent." },
          { label: "Marcus Webb — Brand guidelines revisions", status: "needs-reply", detail: "Two revisions requested. Due Friday. Draft reply ready for your review." },
          { label: "Sarah Lin — Phase 2 feedback (HANDLED)", status: "resolved", detail: "Replied confirming the background tweak. Revision by EOD tomorrow." },
        ],
      },
      {
        title: "Invoices & Payments",
        icon: "dollar-sign",
        items: [
          { label: "Nourish App — $4,500 received", status: "paid", detail: "February retainer deposited. Funds arriving in 2 days." },
          { label: "Archway Financial — $6,000 outstanding", status: "due-soon", detail: "Invoice #INV-2026-015, due Feb 25. Will nudge if unpaid by tomorrow." },
          { label: "Bloom Collective — $3,750 (half upfront)", status: "pending-proposal", detail: "Contingent on proposal acceptance. Proposal sent 9 days ago — no response." },
        ],
      },
      {
        title: "Follow-Ups",
        icon: "user-check",
        items: [
          {
            label: "Jessica Tran — Bloom Collective",
            status: "overdue",
            detail: "Proposal sent 9 days ago, no reply. Warm follow-up email drafted for your review.",
            suggestedAction: "Review & send follow-up",
          },
        ],
      },
    ],
    clawNotes: [
      "I blocked 15 min at 12:45 PM for you to review David Park's LinkedIn and Riviera's website before the call.",
      "The Archway revisions are scoped to ~3 hours of work. Your afternoon block should be enough if you start on time.",
      "Jessica's follow-up is time-sensitive — past 10 days without response, leads tend to go cold.",
    ],
  },
];

// ─── Scenario-only emails (added to inbox when the scenario runs) ────────────

export const scenarioOnlyEmails = [
  {
    id: "email_01",
    threadId: "thread_david_rebrand",
    direction: "inbound",
    from: { name: "David Park", email: "david.park@rivierahg.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Rebrand Project — Would Love to Chat",
    body: `Hi Maya,

I came across your portfolio through a colleague's recommendation and I'm really impressed with the work you did for Nourish App. 

We're Riviera Hospitality Group — we run a chain of four boutique hotels along the California coast. We're planning a full rebrand (logo, visual identity, website, collateral) and are looking for a designer who gets hospitality and luxury positioning.

Would you be available for a 30-minute call this week to discuss the project? Happy to work around your schedule.

Looking forward to hearing from you.

Best,
David Park
VP of Marketing, Riviera Hospitality Group
david.park@rivierahg.com | (415) 555-0172`,
    timestamp: "2026-02-19T14:23:00Z",
    read: true,
    starred: true,
    urgency: "high",
    category: "new-lead",
    labels: ["new-lead", "client"],
    clawSummary: "New lead — David Park from Riviera Hospitality wants a full rebrand for a boutique hotel chain. Requesting a 30-min call this week.",
    requiresReply: false,
    clawAction: "respond-with-calendar-slots",
    clawActionStatus: "completed",
    linkedClientId: "cli_01",
  },
  {
    id: "email_02",
    threadId: "thread_david_rebrand",
    direction: "outbound",
    from: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    to: { name: "David Park", email: "david.park@rivierahg.com" },
    subject: "Re: Rebrand Project — Would Love to Chat",
    body: `Hi David,

Thank you so much for reaching out — that's a wonderful project, and I'd love to learn more about Riviera Hospitality Group's vision.

I have a few openings this week for a 30-minute call. Here are three slots that work well:

• Thursday, Feb 20 — 1:00 PM PST
• Friday, Feb 21 — 10:00 AM PST  
• Friday, Feb 21 — 3:00 PM PST

Let me know which works best for you, or feel free to suggest another time. Looking forward to the conversation!

Warm regards,
Maya`,
    timestamp: "2026-02-19T14:28:00Z",
    read: true,
    starred: false,
    urgency: "high",
    category: "new-lead",
    labels: ["new-lead", "auto-reply"],
    clawSummary: "OpenClaw responded to David with 3 available calendar slots based on Maya's availability.",
    generatedBy: "openclaw",
    approvedBy: "auto",
    calendarSlotsOffered: [
      "2026-02-20T13:00:00-08:00",
      "2026-02-21T10:00:00-08:00",
      "2026-02-21T15:00:00-08:00",
    ],
  },
  {
    id: "email_03",
    threadId: "thread_david_rebrand",
    direction: "inbound",
    from: { name: "David Park", email: "david.park@rivierahg.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Re: Re: Rebrand Project — Would Love to Chat",
    body: `Maya,

Thursday at 1 PM PST works perfectly. Talk to you then!

— David`,
    timestamp: "2026-02-19T15:10:00Z",
    read: true,
    starred: false,
    urgency: "high",
    category: "new-lead",
    labels: ["new-lead"],
    clawSummary: "David confirmed Thursday Feb 20 at 1:00 PM PST. Calendar invite should be sent.",
    requiresReply: false,
    clawAction: "create-calendar-invite",
    clawActionStatus: "completed",
    linkedClientId: "cli_01",
    linkedCalendarEventId: "evt_03",
  },
];

// ─── Collection: inbox ───────────────────────────────────────────────────────

export const inboxSeed = [
  {
    id: "email_04",
    threadId: "thread_nourish_phase2",
    direction: "inbound",
    from: { name: "Sarah Lin", email: "sarah@nourishapp.io" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Phase 2 Screens — Quick Feedback",
    body: `Hey Maya! Just reviewed the latest screens — they look great. Small tweak: can we try a warmer background on the recipe detail page? Everything else is approved. Thanks!`,
    timestamp: "2026-02-19T11:05:00Z",
    read: true,
    starred: false,
    urgency: "medium",
    category: "client-feedback",
    labels: ["client", "feedback"],
    clawSummary: "Sarah approved most Phase 2 screens. One tweak requested — warmer background on recipe detail page.",
    requiresReply: false,
    clawAction: "draft-reply",
    clawActionStatus: "completed",
    linkedClientId: "cli_02",
  },
  {
    id: "email_05",
    threadId: "thread_nourish_phase2",
    direction: "outbound",
    from: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    to: { name: "Sarah Lin", email: "sarah@nourishapp.io" },
    subject: "Re: Phase 2 Screens — Quick Feedback",
    body: `Hi Sarah,

Great to hear! I'll update the recipe detail background — thinking a warm linen tone. I'll send the revision by end of day tomorrow.

Thanks for the quick turnaround!

Best,
Maya`,
    timestamp: "2026-02-19T11:12:00Z",
    read: true,
    starred: false,
    urgency: "medium",
    category: "client-feedback",
    labels: ["client", "auto-reply"],
    clawSummary: "OpenClaw drafted a reply acknowledging the feedback and committing to a revision by EOD Thursday.",
    generatedBy: "openclaw",
    approvedBy: "maya",
  },
  {
    id: "email_06",
    threadId: "thread_archway_guidelines",
    direction: "inbound",
    from: { name: "Marcus Webb", email: "mwebb@archwayfinancial.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Brand Guidelines — Final Revisions",
    body: `Maya, the team reviewed the brand guidelines deck. Two notes:
1. Can we add a section on social media avatar usage?
2. The secondary color palette feels too muted — can we explore a brighter option?

Need this by Friday if possible. Thanks!`,
    timestamp: "2026-02-18T16:45:00Z",
    read: true,
    starred: true,
    urgency: "high",
    category: "revision-request",
    labels: ["client", "revision", "deadline"],
    clawSummary: "Marcus needs two revisions to brand guidelines by Friday: social avatar section + brighter secondary palette.",
    requiresReply: true,
    clawAction: "draft-reply",
    clawActionStatus: "pending",
    linkedClientId: "cli_03",
  },
  {
    id: "email_07",
    threadId: "thread_stripe_nourish",
    direction: "inbound",
    from: { name: "Stripe", email: "notifications@stripe.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Payment received: $4,500.00 from Nourish App",
    body: `You received a payment of $4,500.00 from Nourish App (INV-2026-018). The funds will be deposited into your bank account in 2 business days.`,
    timestamp: "2026-02-19T08:00:00Z",
    read: true,
    starred: false,
    urgency: "low",
    category: "payment-notification",
    labels: ["payment", "automated"],
    clawSummary: "Payment received — $4,500 from Nourish App (February retainer). Funds arriving in 2 days.",
    requiresReply: false,
    clawAction: "log-payment",
    clawActionStatus: "completed",
    linkedInvoiceId: "inv_01",
  },
  {
    id: "email_08",
    threadId: "thread_dribbble",
    direction: "inbound",
    from: { name: "Dribbble", email: "hello@dribbble.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Your shot hit 500 likes!",
    body: `Congrats Maya! Your shot "Nourish App — Recipe Detail" just hit 500 likes on Dribbble.`,
    timestamp: "2026-02-19T07:30:00Z",
    read: true,
    starred: false,
    urgency: "low",
    category: "notification",
    labels: ["notification", "social"],
    clawSummary: "Dribbble notification — portfolio shot hit 500 likes. No action needed.",
    requiresReply: false,
    clawAction: "none",
    clawActionStatus: "completed",
  },
];

// ─── Collection: invoices ────────────────────────────────────────────────────

export const invoicesSeed = [
  {
    id: "inv_01",
    invoiceNumber: "INV-2026-018",
    clientId: "cli_02",
    clientName: "Nourish App",
    contactName: "Sarah Lin",
    contactEmail: "sarah@nourishapp.io",
    description: "February retainer — Product design",
    amount: 4500,
    currency: "USD",
    status: "paid",
    issuedAt: "2026-02-01T09:00:00Z",
    dueDate: "2026-02-15",
    paidAt: "2026-02-19T08:00:00Z",
    paymentMethod: "stripe",
    stripePaymentId: "py_abc123",
    notes: "Funds depositing in 2 business days.",
  },
  {
    id: "inv_02",
    invoiceNumber: "INV-2026-015",
    clientId: "cli_03",
    clientName: "Archway Financial",
    contactName: "Marcus Webb",
    contactEmail: "mwebb@archwayfinancial.com",
    description: "Brand guidelines — Phase 1 delivery",
    amount: 6000,
    currency: "USD",
    status: "outstanding",
    issuedAt: "2026-02-10T09:00:00Z",
    dueDate: "2026-02-25",
    paidAt: null,
    reminderScheduled: "2026-02-22T09:00:00Z",
    notes: "Due in 5 days. OpenClaw will nudge if unpaid by Feb 22.",
  },
  {
    id: "inv_03",
    invoiceNumber: "INV-2026-020",
    clientId: "cli_04",
    clientName: "Bloom Collective",
    contactName: "Jessica Tran",
    contactEmail: "jess@bloomcollective.co",
    description: "Brand identity package — 50% upfront deposit",
    amount: 3750,
    currency: "USD",
    status: "pending-proposal",
    issuedAt: null,
    dueDate: null,
    paidAt: null,
    notes: "Contingent on proposal acceptance. Proposal sent 9 days ago — awaiting response.",
  },
  {
    id: "inv_04",
    invoiceNumber: "INV-2026-012",
    clientId: "cli_02",
    clientName: "Nourish App",
    contactName: "Sarah Lin",
    contactEmail: "sarah@nourishapp.io",
    description: "January retainer — Product design",
    amount: 4500,
    currency: "USD",
    status: "paid",
    issuedAt: "2026-01-01T09:00:00Z",
    dueDate: "2026-01-15",
    paidAt: "2026-01-14T10:30:00Z",
    paymentMethod: "stripe",
    notes: "Paid on time.",
  },
];

// ─── Collection: tasks ───────────────────────────────────────────────────────

export const tasksSeed = [
  {
    id: "task_01",
    title: "Prep for Riviera Rebrand intro call",
    description: "Review David Park's LinkedIn profile and Riviera Hospitality Group website. Prepare 3–5 discovery questions about brand positioning goals.",
    status: "todo",
    priority: "high",
    dueDate: "2026-02-20T12:45:00-08:00",
    project: "Riviera Hospitality — Rebrand",
    assignee: "Maya Chen",
    createdBy: "openclaw",
    createdAt: "2026-02-19T15:15:00Z",
    source: "clickup",
    linkedEmailId: "email_01",
    linkedCalendarEventId: "evt_03",
    linkedClientId: "cli_01",
    tags: ["new-lead", "call-prep"],
  },
  {
    id: "task_02",
    title: "Update recipe detail page background — Nourish Phase 2",
    description: "Sarah requested a warmer background on the recipe detail page. Try warm linen tone. Send revision by EOD Feb 20.",
    status: "todo",
    priority: "medium",
    dueDate: "2026-02-20T17:00:00-08:00",
    project: "Nourish App — Phase 2",
    assignee: "Maya Chen",
    createdBy: "openclaw",
    createdAt: "2026-02-19T11:15:00Z",
    source: "clickup",
    linkedEmailId: "email_04",
    linkedClientId: "cli_02",
    tags: ["revision", "design"],
  },
  {
    id: "task_03",
    title: "Archway brand guidelines — add social avatar section + brighter palette",
    description: "Marcus requested two changes: (1) Add a section on social media avatar usage, (2) Explore a brighter secondary color palette. Due Friday Feb 21.",
    status: "todo",
    priority: "high",
    dueDate: "2026-02-21T17:00:00-08:00",
    project: "Archway Financial — Brand Guidelines",
    assignee: "Maya Chen",
    createdBy: "openclaw",
    createdAt: "2026-02-18T17:00:00Z",
    source: "clickup",
    linkedEmailId: "email_06",
    linkedClientId: "cli_03",
    tags: ["revision", "brand", "deadline-friday"],
  },
  {
    id: "task_04",
    title: "Send follow-up to Jessica Tran — Bloom Collective proposal",
    description: "Proposal sent 9 days ago with no response. Send warm follow-up email. Draft ready for review in email queue.",
    status: "todo",
    priority: "medium",
    dueDate: "2026-02-20T12:00:00-08:00",
    project: "Bloom Collective — Pitch",
    assignee: "Maya Chen",
    createdBy: "openclaw",
    createdAt: "2026-02-20T08:00:00Z",
    source: "notion",
    linkedClientId: "cli_04",
    tags: ["follow-up", "proposal"],
  },
];

// ─── Collection: calendar ────────────────────────────────────────────────────

export const calendarSeed = [
  {
    id: "evt_01",
    title: "Daily Brief Review",
    datetime: "2026-02-20T08:00:00-08:00",
    duration: 15,
    type: "routine",
    source: "openclaw",
    allDay: false,
    location: null,
    attendees: [],
    notes: null,
  },
  {
    id: "evt_02",
    title: "Deep Work — Nourish App Phase 2 Screens",
    datetime: "2026-02-20T10:00:00-08:00",
    duration: 120,
    type: "deep-work",
    source: "maya",
    allDay: false,
    location: null,
    attendees: [],
    notes: "Focus block — no interruptions. Recipe detail page revision.",
  },
  {
    id: "evt_03",
    title: "Intro Call — David Park (Riviera Rebrand)",
    datetime: "2026-02-20T13:00:00-08:00",
    duration: 30,
    type: "client-call",
    source: "openclaw",
    allDay: false,
    location: "Google Meet",
    meetLink: "https://meet.google.com/abc-defg-hij",
    attendees: [
      { name: "David Park", email: "david.park@rivierahg.com", rsvp: "accepted" },
      { name: "Maya Chen", email: "maya@mayachendesign.com", rsvp: "accepted" },
    ],
    linkedClientId: "cli_01",
    linkedEmailId: "email_01",
    notes: "Agenda: Project scope, brand positioning goals, budget, next steps. Prepared by OpenClaw.",
    status: "confirmed",
  },
  {
    id: "evt_prep_03",
    title: "Prep — Review Riviera HG + David Park LinkedIn",
    datetime: "2026-02-20T12:45:00-08:00",
    duration: 15,
    type: "prep",
    source: "openclaw",
    allDay: false,
    location: null,
    attendees: [],
    linkedCalendarEventId: "evt_03",
    notes: "15-min prep block before intro call.",
  },
  {
    id: "evt_04",
    title: "Deep Work — Archway Brand Guidelines Revisions",
    datetime: "2026-02-20T14:00:00-08:00",
    duration: 120,
    type: "deep-work",
    source: "maya",
    allDay: false,
    location: null,
    attendees: [],
    notes: "Social avatar section + brighter secondary palette. Due Friday.",
  },
  {
    id: "evt_05",
    title: "Weekly Review & Planning",
    datetime: "2026-02-20T16:30:00-08:00",
    duration: 30,
    type: "routine",
    source: "maya",
    allDay: false,
    location: null,
    attendees: [],
    notes: null,
  },
];

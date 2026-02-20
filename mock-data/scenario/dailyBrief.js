export const dailyBrief = {
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
        {
          label: "David Park — Rebrand intro (HANDLED)",
          status: "resolved",
          detail: "Responded with 3 calendar slots. David confirmed Thu 1 PM. Invite sent.",
        },
        {
          label: "Marcus Webb — Brand guidelines revisions",
          status: "needs-reply",
          detail: "Two revisions requested. Due Friday. Draft reply ready for your review.",
        },
        {
          label: "Sarah Lin — Phase 2 feedback (HANDLED)",
          status: "resolved",
          detail: "Replied confirming the background tweak. Revision by EOD tomorrow.",
        },
      ],
    },
    {
      title: "Invoices & Payments",
      icon: "dollar-sign",
      items: [
        {
          label: "Nourish App — $4,500 received",
          status: "paid",
          detail: "February retainer deposited. Funds arriving in 2 days.",
        },
        {
          label: "Archway Financial — $6,000 outstanding",
          status: "due-soon",
          detail: "Invoice #INV-2026-015, due Feb 25. Will nudge if unpaid by tomorrow.",
        },
        {
          label: "Bloom Collective — $3,750 (half upfront)",
          status: "pending-proposal",
          detail: "Contingent on proposal acceptance. Proposal sent 9 days ago — no response.",
        },
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
};

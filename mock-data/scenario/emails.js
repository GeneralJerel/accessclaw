export const emails = [
  // --- THE DEMO TRIGGER: Inbound client email ---
  {
    id: "email_01",
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
    receivedAt: "2026-02-19T14:23:00Z",
    urgency: "high",
    category: "new-lead",
    clawSummary: "New lead — David Park from Riviera Hospitality wants a full rebrand for a boutique hotel chain. Requesting a 30-min call this week.",
    requiresReply: true,
    clawAction: "respond-with-calendar-slots",
  },

  // --- OPENCLAW'S AUTO-RESPONSE ---
  {
    id: "email_02",
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
    sentAt: "2026-02-19T14:28:00Z",
    urgency: "high",
    category: "new-lead",
    clawSummary: "OpenClaw responded to David with 3 available calendar slots based on Maya's availability.",
    generatedBy: "openclaw",
    approvedBy: "auto",
    calendarSlotsOffered: [
      "2026-02-20T13:00:00-08:00",
      "2026-02-21T10:00:00-08:00",
      "2026-02-21T15:00:00-08:00",
    ],
  },

  // --- CLIENT PICKS A SLOT ---
  {
    id: "email_03",
    direction: "inbound",
    from: { name: "David Park", email: "david.park@rivierahg.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Re: Re: Rebrand Project — Would Love to Chat",
    body: `Maya,

Thursday at 1 PM PST works perfectly. Talk to you then!

— David`,
    receivedAt: "2026-02-19T15:10:00Z",
    urgency: "high",
    category: "new-lead",
    clawSummary: "David confirmed Thursday Feb 20 at 1:00 PM PST. Calendar invite should be sent.",
    requiresReply: false,
    clawAction: "create-calendar-invite",
  },

  // --- OTHER EMAILS FOR CONTEXT ---
  {
    id: "email_04",
    direction: "inbound",
    from: { name: "Sarah Lin", email: "sarah@nourishapp.io" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Phase 2 Screens — Quick Feedback",
    body: `Hey Maya! Just reviewed the latest screens — they look great. Small tweak: can we try a warmer background on the recipe detail page? Everything else is approved. Thanks!`,
    receivedAt: "2026-02-19T11:05:00Z",
    urgency: "medium",
    category: "client-feedback",
    clawSummary: "Sarah approved most Phase 2 screens. One tweak requested — warmer background on recipe detail page.",
    requiresReply: true,
    clawAction: "draft-reply",
  },

  {
    id: "email_05",
    direction: "outbound",
    from: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    to: { name: "Sarah Lin", email: "sarah@nourishapp.io" },
    subject: "Re: Phase 2 Screens — Quick Feedback",
    body: `Hi Sarah,

Great to hear! I'll update the recipe detail background — thinking a warm linen tone. I'll send the revision by end of day tomorrow.

Thanks for the quick turnaround!

Best,
Maya`,
    sentAt: "2026-02-19T11:12:00Z",
    urgency: "medium",
    category: "client-feedback",
    clawSummary: "OpenClaw drafted a reply acknowledging the feedback and committing to a revision by EOD Thursday.",
    generatedBy: "openclaw",
    approvedBy: "maya",
  },

  {
    id: "email_06",
    direction: "inbound",
    from: { name: "Marcus Webb", email: "mwebb@archwayfinancial.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Brand Guidelines — Final Revisions",
    body: `Maya, the team reviewed the brand guidelines deck. Two notes:
1. Can we add a section on social media avatar usage?
2. The secondary color palette feels too muted — can we explore a brighter option?

Need this by Friday if possible. Thanks!`,
    receivedAt: "2026-02-18T16:45:00Z",
    urgency: "high",
    category: "revision-request",
    clawSummary: "Marcus needs two revisions to brand guidelines by Friday: social avatar section + brighter secondary palette.",
    requiresReply: true,
    clawAction: "draft-reply",
  },

  {
    id: "email_07",
    direction: "inbound",
    from: { name: "Stripe", email: "notifications@stripe.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Payment received: $4,500.00 from Nourish App",
    body: `You received a payment of $4,500.00 from Nourish App (INV-2026-018). The funds will be deposited into your bank account in 2 business days.`,
    receivedAt: "2026-02-19T08:00:00Z",
    urgency: "low",
    category: "payment-notification",
    clawSummary: "Payment received — $4,500 from Nourish App (February retainer). Funds arriving in 2 days.",
    requiresReply: false,
    clawAction: "log-payment",
  },

  {
    id: "email_08",
    direction: "inbound",
    from: { name: "Dribbble", email: "hello@dribbble.com" },
    to: { name: "Maya Chen", email: "maya@mayachendesign.com" },
    subject: "Your shot hit 500 likes!",
    body: `Congrats Maya! Your shot "Nourish App — Recipe Detail" just hit 500 likes on Dribbble.`,
    receivedAt: "2026-02-19T07:30:00Z",
    urgency: "low",
    category: "notification",
    clawSummary: "Dribbble notification — portfolio shot hit 500 likes. No action needed.",
    requiresReply: false,
    clawAction: "none",
  },
];

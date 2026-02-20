export const calendarSlots = {
  offered: [
    {
      id: "slot_01",
      datetime: "2026-02-20T13:00:00-08:00",
      duration: 30,
      status: "selected",
      label: "Thursday, Feb 20 — 1:00 PM PST",
    },
    {
      id: "slot_02",
      datetime: "2026-02-21T10:00:00-08:00",
      duration: 30,
      status: "available",
      label: "Friday, Feb 21 — 10:00 AM PST",
    },
    {
      id: "slot_03",
      datetime: "2026-02-21T15:00:00-08:00",
      duration: 30,
      status: "available",
      label: "Friday, Feb 21 — 3:00 PM PST",
    },
  ],
  selectedSlot: "slot_01",
  generatedBy: "openclaw",
  basedOn: "Maya's calendar availability + deep work block avoidance",
};

export const calendarInvite = {
  id: "cal_inv_01",
  title: "Intro Call — Maya Chen × David Park (Riviera Rebrand)",
  datetime: "2026-02-20T13:00:00-08:00",
  duration: 30,
  location: "Google Meet (auto-generated)",
  meetLink: "https://meet.google.com/abc-defg-hij",
  organizer: { name: "Maya Chen", email: "maya@mayachendesign.com" },
  attendees: [
    { name: "David Park", email: "david.park@rivierahg.com", rsvp: "accepted" },
    { name: "Maya Chen", email: "maya@mayachendesign.com", rsvp: "accepted" },
  ],
  description: `Intro call to discuss a full rebrand project for Riviera Hospitality Group (4 boutique hotels, California coast).

Agenda:
• Project scope and timeline
• Brand positioning goals
• Budget and deliverables
• Next steps

Prepared by OpenClaw`,
  createdBy: "openclaw",
  createdAt: "2026-02-19T15:12:00Z",
  status: "confirmed",
  notifications: {
    freelancer: { sent: true, sentAt: "2026-02-19T15:12:00Z" },
    client: { sent: true, sentAt: "2026-02-19T15:12:00Z" },
  },
};

export const calendarEvents = [
  {
    id: "evt_01",
    title: "Daily Brief Review",
    datetime: "2026-02-20T08:00:00-08:00",
    duration: 15,
    type: "routine",
    source: "openclaw",
  },
  {
    id: "evt_02",
    title: "Deep Work — Nourish App Phase 2 Screens",
    datetime: "2026-02-20T10:00:00-08:00",
    duration: 120,
    type: "deep-work",
    source: "maya",
  },
  {
    id: "evt_03",
    title: "Intro Call — David Park (Riviera Rebrand)",
    datetime: "2026-02-20T13:00:00-08:00",
    duration: 30,
    type: "client-call",
    source: "openclaw",
    linkedClient: "cli_01",
    linkedEmail: "email_01",
  },
  {
    id: "evt_04",
    title: "Deep Work — Archway Brand Guidelines Revisions",
    datetime: "2026-02-20T14:00:00-08:00",
    duration: 120,
    type: "deep-work",
    source: "maya",
  },
  {
    id: "evt_05",
    title: "Weekly Review & Planning",
    datetime: "2026-02-20T16:30:00-08:00",
    duration: 30,
    type: "routine",
    source: "maya",
  },
];

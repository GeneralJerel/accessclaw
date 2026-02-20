import type { Email } from "@/types";

export const emails: Email[] = [
  {
    id: "e1",
    sender: "Sarah Chen",
    senderEmail: "sarah@meridianlabs.io",
    subject: "Re: Q2 Project Proposal",
    preview:
      "Hi Jerel, I've shared the proposal with our VP. Can we schedule a call to discuss timeline?",
    receivedAt: "9:42 AM",
    urgency: "high",
    isRead: false,
  },
  {
    id: "e2",
    sender: "James Okafor",
    senderEmail: "james@baselineventures.com",
    subject: "Invoice #1047 — Question",
    preview:
      "Hey, quick question on the line item for the API integration work. Can you break that down?",
    receivedAt: "8:15 AM",
    urgency: "high",
    isRead: false,
  },
  {
    id: "e3",
    sender: "Priya Anand",
    senderEmail: "priya@solsticedigital.co",
    subject: "Design review feedback",
    preview:
      "Love the direction! A few minor notes on the dashboard layout — see attached markup.",
    receivedAt: "Yesterday",
    urgency: "medium",
    isRead: true,
  },
  {
    id: "e4",
    sender: "Marcus Rivera",
    senderEmail: "marcus@novexagroup.com",
    subject: "Monthly retainer renewal",
    preview:
      "All good on our end. Let's keep the same terms for Q2. Send over the updated SOW when ready.",
    receivedAt: "Yesterday",
    urgency: "low",
    isRead: true,
  },
  {
    id: "e5",
    sender: "Alex Torres",
    senderEmail: "alex@torresdesign.co",
    subject: "Referral intro — potential client",
    preview:
      "Connecting you with a founder who needs help with their product strategy. Looping them in.",
    receivedAt: "2 days ago",
    urgency: "medium",
    isRead: false,
  },
];

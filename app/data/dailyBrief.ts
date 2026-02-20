import type { DailyBrief } from "@/types";

export const dailyBrief: DailyBrief = {
  greeting: "Good morning, Jerel",
  date: "Thursday, February 19, 2026",
  stats: [
    { label: "Meetings Today", value: 3, trend: "neutral" },
    { label: "Emails to Review", value: 7, trend: "up" },
    { label: "Pending Invoices", value: 2, trend: "down" },
    { label: "Active Projects", value: 5, trend: "up" },
  ],
  topPriority:
    "Follow up with Meridian Labs — proposal sent 4 days ago, no response yet.",
};

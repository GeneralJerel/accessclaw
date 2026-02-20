import type { Client } from "@/types";

export const clients: Client[] = [
  {
    id: "c1",
    name: "Sarah Chen",
    company: "Meridian Labs",
    status: "pending",
    lastContact: "4 days ago",
    monthlyValue: "$8,500",
    avatarInitials: "SC",
  },
  {
    id: "c2",
    name: "Marcus Rivera",
    company: "Novexa Group",
    status: "active",
    lastContact: "Today",
    monthlyValue: "$12,000",
    avatarInitials: "MR",
  },
  {
    id: "c3",
    name: "Priya Anand",
    company: "Solstice Digital",
    status: "active",
    lastContact: "1 day ago",
    monthlyValue: "$6,200",
    avatarInitials: "PA",
  },
  {
    id: "c4",
    name: "James Okafor",
    company: "Baseline Ventures",
    status: "at-risk",
    lastContact: "12 days ago",
    monthlyValue: "$15,000",
    avatarInitials: "JO",
  },
  {
    id: "c5",
    name: "Elena Volkov",
    company: "Arclight Studios",
    status: "active",
    lastContact: "2 days ago",
    monthlyValue: "$9,800",
    avatarInitials: "EV",
  },
];

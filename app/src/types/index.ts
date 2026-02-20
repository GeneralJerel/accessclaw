export interface DailyBrief {
  greeting: string;
  date: string;
  stats: BriefStatData[];
  topPriority: string;
}

export interface BriefStatData {
  label: string;
  value: string | number;
  trend?: "up" | "down" | "neutral";
}

export interface Client {
  id: string;
  name: string;
  company: string;
  status: "active" | "pending" | "at-risk";
  lastContact: string;
  monthlyValue: string;
  avatarInitials: string;
}

export interface Email {
  id: string;
  sender: string;
  senderEmail: string;
  subject: string;
  preview: string;
  receivedAt: string;
  urgency: "high" | "medium" | "low";
  isRead: boolean;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  dueDate?: string;
}

import type { Todo } from "@/types";

export const todos: Todo[] = [
  {
    id: "t1",
    text: "Send revised proposal to Meridian Labs",
    completed: false,
    priority: "high",
    dueDate: "Today",
  },
  {
    id: "t2",
    text: "Follow up on Invoice #1047 with Baseline Ventures",
    completed: false,
    priority: "high",
    dueDate: "Today",
  },
  {
    id: "t3",
    text: "Review Solstice Digital design feedback",
    completed: false,
    priority: "medium",
    dueDate: "Tomorrow",
  },
  {
    id: "t4",
    text: "Prepare SOW for Novexa Q2 retainer",
    completed: false,
    priority: "medium",
    dueDate: "Feb 21",
  },
  {
    id: "t5",
    text: "Reply to Alex Torres referral intro",
    completed: false,
    priority: "medium",
    dueDate: "Today",
  },
  {
    id: "t6",
    text: "Block deep work time on Friday calendar",
    completed: true,
    priority: "low",
  },
  {
    id: "t7",
    text: "Update portfolio site with Arclight case study",
    completed: false,
    priority: "low",
    dueDate: "Feb 25",
  },
];

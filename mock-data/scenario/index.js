export { freelancer } from "./freelancer";
export { clients } from "./clients";
export { emails } from "./emails";
export { calendarSlots, calendarInvite, calendarEvents } from "./calendar";
export { dailyBrief } from "./dailyBrief";
export { tasks, notionPage } from "./tasks";
export { openclawTasks, openclawActivityLog } from "./openclawTasks";

/**
 * SCENARIO: "A Day in Maya's Life with OpenClaw"
 *
 * Timeline of events:
 *
 * Feb 19, 2:23 PM — David Park emails Maya about a rebrand project (email_01)
 * Feb 19, 2:28 PM — OpenClaw auto-responds with 3 calendar slots (email_02)
 * Feb 19, 3:10 PM — David confirms Thursday 1 PM (email_03)
 * Feb 19, 3:12 PM — OpenClaw creates Google Calendar invite (cal_inv_01)
 * Feb 19, 3:15 PM — OpenClaw creates ClickUp prep task (task_01)
 * Feb 19, 3:20 PM — OpenClaw creates Notion discovery page (notion_page_01)
 * Feb 20, 8:00 AM — OpenClaw generates daily brief (brief_2026-02-20)
 * Feb 20, 8:30 AM — OpenClaw checks task list — 4 items surfaced
 * Feb 20, 9:00 AM — OpenClaw checks invoices — 1 outstanding, not yet overdue
 *
 * OpenClaw Recurring Tasks:
 *   - Daily brief every morning at 8 AM
 *   - Email check every hour (9 AM – 6 PM)
 *   - Invoice check every morning at 9 AM
 *   - Task list review every morning at 8:30 AM
 *   - Client situating on-demand (triggered by new lead detection)
 */

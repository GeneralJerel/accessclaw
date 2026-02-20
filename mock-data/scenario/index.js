/**
 * LEGACY re-exports.
 * Prefer importing from `mock-data/index.js` (the db) for new code.
 * These re-exports keep existing consumers working.
 */

export { freelancerProfile as freelancer } from "../seed.js";
export { clientsSeed as clients } from "../seed.js";
export { inboxSeed as emails } from "../seed.js";
export { calendarSeed as calendarEvents } from "../seed.js";
export { dailyBriefsSeed } from "../seed.js";
export { tasksSeed as tasks } from "../seed.js";
export { invoicesSeed as invoices } from "../seed.js";

export { openclawTasks, openclawActivityLog } from "./openclawTasks.js";
export { notionPage } from "./tasks.js";

// Legacy calendar helpers — kept for Scenario page
export { calendarSlots, calendarInvite } from "./calendar.js";

// Legacy daily brief as a single object (old format)
import { dailyBriefsSeed } from "../seed.js";
export const dailyBrief = dailyBriefsSeed[0];

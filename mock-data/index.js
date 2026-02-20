/**
 * Mock Database — Firebase-style NoSQL store for OpenClaw.
 *
 * Collections:
 *   db.collection("dailyBriefs")   — daily morning briefs
 *   db.collection("inbox")         — all emails (inbound + outbound)
 *   db.collection("invoices")      — invoices & payment records
 *   db.collection("tasks")         — tasks / to-dos
 *   db.collection("calendar")      — calendar events
 *   db.collection("clients")       — client profiles
 *
 * Helpers:
 *   sendEmail(emailDoc)            — appends to inbox
 *   getThread(threadId)            — returns all emails in a thread, sorted
 *   getInboxByUrgency(level)       — filter inbox by urgency
 *   getTasksByStatus(status)       — filter tasks by status
 *   getUpcomingEvents(hours)       — events in the next N hours
 *   getOutstandingInvoices()       — unpaid invoices
 */

import db from "./db.js";
import {
  freelancerProfile,
  clientsSeed,
  dailyBriefsSeed,
  inboxSeed,
  invoicesSeed,
  tasksSeed,
  calendarSeed,
} from "./seed.js";

// ─── Seed all collections ────────────────────────────────────────────────────

db.seed("dailyBriefs", dailyBriefsSeed);
db.seed("inbox", inboxSeed);
db.seed("invoices", invoicesSeed);
db.seed("tasks", tasksSeed);
db.seed("calendar", calendarSeed);
db.seed("clients", clientsSeed);

// ─── Freelancer profile (singleton, not a collection) ────────────────────────

export const freelancer = freelancerProfile;

// ─── Convenience helpers ─────────────────────────────────────────────────────

/**
 * Append a new email to the inbox. Merges sensible defaults.
 * Returns the created document.
 */
export function sendEmail({
  direction = "outbound",
  from = { name: freelancer.name, email: freelancer.email },
  to,
  subject,
  body,
  threadId = null,
  generatedBy = null,
  approvedBy = null,
  ...rest
}) {
  return db.collection("inbox").add({
    direction,
    from,
    to,
    subject,
    body,
    threadId,
    timestamp: new Date().toISOString(),
    read: direction === "outbound",
    starred: false,
    urgency: "medium",
    category: "general",
    labels: direction === "outbound" ? ["sent"] : [],
    generatedBy,
    approvedBy,
    ...rest,
  });
}

export function getThread(threadId) {
  return db
    .collection("inbox")
    .query((e) => e.threadId === threadId)
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
}

export function getInboxByUrgency(level) {
  return db.collection("inbox").query((e) => e.urgency === level);
}

export function getUnreadEmails() {
  return db.collection("inbox").query((e) => !e.read);
}

export function getTasksByStatus(status) {
  return db.collection("tasks").query((t) => t.status === status);
}

export function getTasksDueToday() {
  const today = new Date().toISOString().slice(0, 10);
  return db.collection("tasks").query((t) => t.dueDate?.startsWith(today));
}

export function getUpcomingEvents(hoursAhead = 24) {
  const now = new Date();
  const cutoff = new Date(now.getTime() + hoursAhead * 60 * 60 * 1000);
  return db
    .collection("calendar")
    .query((e) => {
      const dt = new Date(e.datetime);
      return dt >= now && dt <= cutoff;
    })
    .sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
}

export function getOutstandingInvoices() {
  return db.collection("invoices").query((i) => i.status === "outstanding");
}

export function getOverdueInvoices() {
  const today = new Date().toISOString().slice(0, 10);
  return db
    .collection("invoices")
    .query((i) => i.status === "outstanding" && i.dueDate && i.dueDate < today);
}

export function getTodaysBrief() {
  const today = new Date().toISOString().slice(0, 10);
  return db.collection("dailyBriefs").query((b) => b.date === today)[0] ?? null;
}

export function getClientById(clientId) {
  return db.collection("clients").get(clientId);
}

// ─── Re-export the db instance ───────────────────────────────────────────────

export default db;

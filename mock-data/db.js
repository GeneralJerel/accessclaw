/**
 * Mock Firebase-style NoSQL database for OpenClaw.
 *
 * Collections:
 *   dailyBriefs/{briefId}
 *   inbox/{emailId}
 *   invoices/{invoiceId}
 *   tasks/{taskId}
 *   calendar/{eventId}
 *
 * Usage:
 *   import db from "@/mock-data/db";
 *
 *   db.collection("inbox").getAll();
 *   db.collection("inbox").get("email_01");
 *   db.collection("inbox").add({ ... });
 *   db.collection("inbox").update("email_01", { status: "archived" });
 *   db.collection("inbox").remove("email_01");
 *   db.collection("inbox").query(e => e.direction === "inbound");
 *   db.collection("inbox").subscribe(listener);
 */

let _listeners = {};

function createCollection(name, initialDocs = []) {
  let docs = new Map(initialDocs.map((d) => [d.id, { ...d }]));

  function notify() {
    (_listeners[name] || []).forEach((fn) => fn(getAll()));
  }

  function getAll() {
    return Array.from(docs.values());
  }

  function get(id) {
    return docs.get(id) ?? null;
  }

  function add(doc) {
    const id = doc.id ?? `${name}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const record = { ...doc, id, _createdAt: new Date().toISOString() };
    docs.set(id, record);
    notify();
    return record;
  }

  function update(id, partial) {
    const existing = docs.get(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial, _updatedAt: new Date().toISOString() };
    docs.set(id, updated);
    notify();
    return updated;
  }

  function remove(id) {
    const deleted = docs.delete(id);
    if (deleted) notify();
    return deleted;
  }

  function query(predicate) {
    return getAll().filter(predicate);
  }

  function subscribe(listener) {
    if (!_listeners[name]) _listeners[name] = [];
    _listeners[name].push(listener);
    return () => {
      _listeners[name] = _listeners[name].filter((fn) => fn !== listener);
    };
  }

  function count() {
    return docs.size;
  }

  function reset(seedDocs = []) {
    docs = new Map(seedDocs.map((d) => [d.id, { ...d }]));
    notify();
  }

  return { getAll, get, add, update, remove, query, subscribe, count, reset };
}

const db = {
  _collections: {},

  collection(name) {
    if (!this._collections[name]) {
      this._collections[name] = createCollection(name);
    }
    return this._collections[name];
  },

  seed(name, docs) {
    this._collections[name] = createCollection(name, docs);
  },

  resetAll() {
    this._collections = {};
    _listeners = {};
  },
};

export default db;

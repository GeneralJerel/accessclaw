/**
 * Cross-tab event bus using BroadcastChannel.
 *
 * emit() fires local listeners AND posts to BroadcastChannel.
 * Messages from other tabs fire local listeners only.
 * Same on/emit API — consumers don't need to know about cross-tab.
 *
 * Events:
 *   inbox:add      — { email: object }          (full email doc to add to local DB)
 *   chat:message   — { text: string, role: string }
 *   chat:typing    — { isTyping: boolean }
 *   ui:switchView  — { workspace: string }
 *   ui:selectEmail — { emailId: string }
 */

const CHANNEL_NAME = "openclaw_scenario";

const listeners = {};
let channel = null;

try {
  channel = new BroadcastChannel(CHANNEL_NAME);
  channel.onmessage = (msgEvent) => {
    const { event, payload } = msgEvent.data;
    (listeners[event] || []).forEach((fn) => fn(payload));
  };
} catch (_) {
  // BroadcastChannel not supported — local-only fallback
}

const eventBus = {
  on(event, callback) {
    if (!listeners[event]) listeners[event] = [];
    listeners[event].push(callback);
    return () => {
      listeners[event] = listeners[event].filter((fn) => fn !== callback);
    };
  },

  emit(event, payload) {
    (listeners[event] || []).forEach((fn) => fn(payload));
    try {
      channel?.postMessage({ event, payload });
    } catch (_) {
      // Ignore serialization errors
    }
  },
};

export default eventBus;

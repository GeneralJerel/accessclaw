/**
 * Lightweight pub/sub event bus for cross-page communication.
 *
 * Events:
 *   chat:message   — { text: string, role: 'system'|'user' }
 *   chat:typing    — { isTyping: boolean }
 *   ui:switchView  — { workspace: string }
 *   ui:selectEmail — { emailId: string }
 */

const listeners = {};

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
  },
};

export default eventBus;

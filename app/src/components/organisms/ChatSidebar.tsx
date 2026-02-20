import { useState } from "react";

const mockMessages = [
  {
    id: "m1",
    role: "assistant" as const,
    text: "Good morning! Here's your daily overview: You have 3 meetings today, 7 emails need attention, and 2 invoices are pending. Your top priority is following up with Meridian Labs on the Q2 proposal.",
  },
  {
    id: "m2",
    role: "user" as const,
    text: "Draft a follow-up email to Sarah at Meridian Labs about the proposal.",
  },
  {
    id: "m3",
    role: "assistant" as const,
    text: 'I\'ve drafted a follow-up for Sarah Chen at Meridian Labs. Here\'s what I have:\n\n"Hi Sarah, I wanted to check in on the Q2 project proposal I sent over last week. I\'d love to hop on a quick call to walk through the timeline and answer any questions from your team. Would Thursday or Friday work for a 30-minute sync?"\n\nWould you like me to send this, or would you like to edit it first?',
  },
];

export function ChatSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-2xl border border-glass-border bg-white/70 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] transition-all duration-300 hover:bg-white/90 hover:shadow-[0_6px_32px_rgba(0,0,0,0.14)] hover:scale-105 active:scale-95"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-secondary"
        >
          {isOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
          )}
        </svg>
      </button>

      <div
        className={`fixed right-0 top-0 bottom-0 z-40 w-[380px] max-w-[90vw] flex flex-col border-l border-glass-border bg-white/85 backdrop-blur-2xl shadow-[-8px_0_32px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-glass-border px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-accent-blue/10">
              <span className="text-sm">🧠</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-text-primary">
                Chief of Staff
              </h3>
              <span className="text-[10px] font-medium text-accent-emerald">Online</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-text-tertiary transition-colors hover:bg-glass-8 hover:text-text-primary"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {mockMessages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-accent-blue text-white"
                    : "bg-glass-5 border border-glass-border text-text-secondary"
                }`}
              >
                <p className="whitespace-pre-line">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-glass-border p-4">
          <div className="flex items-center gap-2 rounded-xl border border-glass-border bg-white/60 px-4 py-2.5">
            <input
              type="text"
              placeholder="Ask your Chief of Staff..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
            />
            <button
              type="button"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-accent-blue text-white transition-colors hover:bg-accent-blue/90"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </div>
          <p className="mt-2 text-center text-[10px] text-text-muted">
            Powered by AG-UI Protocol · CopilotKit
          </p>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/10 backdrop-blur-sm md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}

import type { Todo } from "@/types";
import { Checkbox } from "@/components/atoms/Checkbox";

interface TodoItemProps {
  todo: Todo;
  onToggle?: (id: string) => void;
}

const priorityDot: Record<Todo["priority"], string> = {
  high: "bg-urgency-high",
  medium: "bg-urgency-medium",
  low: "bg-urgency-low",
};

export function TodoItem({ todo, onToggle }: TodoItemProps) {
  return (
    <div className="flex items-start gap-3 px-6 py-3 transition-colors hover:bg-glass-5 cursor-default">
      <div className="pt-0.5">
        <Checkbox checked={todo.completed} onChange={() => onToggle?.(todo.id)} />
      </div>
      <div className="flex flex-1 min-w-0 items-start justify-between gap-3">
        <div className="flex items-start gap-2 min-w-0">
          <span className={`relative top-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${priorityDot[todo.priority]}`} />
          <span
            className={`text-sm leading-relaxed ${
              todo.completed
                ? "line-through text-text-muted"
                : "text-text-primary"
            }`}
          >
            {todo.text}
          </span>
        </div>
        {todo.dueDate && (
          <span className="text-[11px] text-text-tertiary shrink-0 pt-0.5">
            {todo.dueDate}
          </span>
        )}
      </div>
    </div>
  );
}

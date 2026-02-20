import { useState } from "react";
import { GlassCard } from "@/components/atoms/GlassCard";
import { TodoItem } from "@/components/molecules/TodoItem";
import { todos as initialTodos } from "@data/todos";

export function TodoListCard() {
  const [todos, setTodos] = useState(initialTodos);

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    );
  };

  const completed = todos.filter((t) => t.completed).length;

  return (
    <GlassCard title="To-Do" icon="✅">
      <div className="px-6 pt-1 pb-2">
        <span className="text-xs text-text-tertiary">
          {completed}/{todos.length} completed
        </span>
      </div>
      <div className="divide-y divide-glass-border pb-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={handleToggle} />
        ))}
      </div>
    </GlassCard>
  );
}

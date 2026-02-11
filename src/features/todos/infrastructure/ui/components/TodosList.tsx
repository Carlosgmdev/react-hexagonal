import type { JSX } from "react";
import useTodoStore from "../../stores/todo.store";
import type Todo from "../../../domain/entities/todo.entity";
import TodoItem from "./TodoItem";

export default function TodosList(): JSX.Element {
  const { todos } = useTodoStore();

  if (todos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-slate-500 font-medium">No todos yet</p>
        <p className="text-slate-400 text-sm mt-1">Create your first todo to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo: Todo) => (
        <TodoItem key={todo.getId()} todo={todo} />
      ))}
    </div>
  );
}

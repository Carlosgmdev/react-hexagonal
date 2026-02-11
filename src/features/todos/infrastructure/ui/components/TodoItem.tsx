import type { JSX } from "react";
import { Link } from "react-router";
import type Todo from "../../../domain/entities/todo.entity";
import TodoStatus from "./TodoStatus";
import { TodoStatus as TodoStatusEnum } from "../../../domain/enums/todo-status.enum";
import useTodoStore from "../../stores/todo.store";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps): JSX.Element {
  const { startTodo, completeTodo, deleteTodo } = useTodoStore();

  return (
    <div className="group p-5 rounded-xl bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to={`/todos/${todo.getId()}`}
            className="text-lg font-semibold text-slate-800 hover:text-blue-600 transition-colors line-clamp-1"
          >
            {todo.getTitle()}
          </Link>
          <p className="text-sm text-slate-500 mt-1 line-clamp-2">{todo.getDescription()}</p>
        </div>
        <TodoStatus status={todo.getStatus()} />
      </div>

      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
        {todo.getStatus() === TodoStatusEnum.PENDING && (
          <button
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 active:scale-95"
            onClick={() => startTodo(todo.getId())}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Start
          </button>
        )}

        {todo.getStatus() === TodoStatusEnum.IN_PROGRESS && (
          <button
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 text-white rounded-lg cursor-pointer hover:bg-emerald-700 active:scale-95"
            onClick={() => completeTodo(todo.getId())}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Complete
          </button>
        )}

        <button
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 active:scale-95 ml-auto opacity-0 group-hover:opacity-100"
          onClick={() => deleteTodo(todo.getId())}
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

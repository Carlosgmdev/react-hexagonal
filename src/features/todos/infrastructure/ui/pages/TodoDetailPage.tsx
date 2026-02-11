import { useEffect, useState, type JSX } from "react";
import { useParams, useNavigate } from "react-router";
import type Todo from "../../../domain/entities/todo.entity";
import { TodoStatus as TodoStatusEnum } from "../../../domain/enums/todo-status.enum";
import TodoStatus from "../components/TodoStatus";
import useTodoStore from "../../stores/todo.store";

export default function TodoDetailPage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { findTodoById, startTodo, completeTodo, deleteTodo } = useTodoStore();

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const todoId: number = Number(id);

  useEffect(() => {
    const loadTodo = async (): Promise<void> => {
      try {
        const found: Todo | null = await findTodoById(todoId);
        setTodo(found);
      } catch {
        setError("Failed to load todo.");
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [todoId, findTodoById]);

  const handleStart = async (): Promise<void> => {
    await startTodo(todoId);
    const updated: Todo | null = await findTodoById(todoId);
    setTodo(updated);
  };

  const handleComplete = async (): Promise<void> => {
    await completeTodo(todoId);
    const updated: Todo | null = await findTodoById(todoId);
    setTodo(updated);
  };

  const handleDelete = async (): Promise<void> => {
    await deleteTodo(todoId);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div className="max-w-lg mx-auto px-4 pt-20 text-center">
        <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <p className="text-slate-700 font-medium">
          {error ?? "Todo not found"}
        </p>
        <p className="text-slate-400 text-sm mt-1">
          The todo you're looking for doesn't exist
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-6 inline-flex items-center gap-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 active:scale-95"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      <header className="pt-12 pb-8">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 cursor-pointer mb-4"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to todos
        </button>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          Todo Detail
        </h1>
      </header>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-xl font-bold text-slate-900">
              {todo.getTitle()}
            </h2>
            <TodoStatus status={todo.getStatus()} />
          </div>

          <p className="text-slate-600 mt-3 leading-relaxed">
            {todo.getDescription()}
          </p>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              Created {todo.getCreatedAt().toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1.5">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Updated {todo.getUpdatedAt().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        {todo.getStatus() === TodoStatusEnum.PENDING && (
          <button
            onClick={handleStart}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-blue-700 active:scale-95 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Start task
          </button>
        )}

        {todo.getStatus() === TodoStatusEnum.IN_PROGRESS && (
          <button
            onClick={handleComplete}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 text-white text-sm font-medium rounded-lg cursor-pointer hover:bg-emerald-700 active:scale-95 shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Complete task
          </button>
        )}

        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 px-4 py-2.5 text-red-600 bg-red-50 text-sm font-medium border border-red-200 rounded-lg cursor-pointer hover:bg-red-100 active:scale-95"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  );
}

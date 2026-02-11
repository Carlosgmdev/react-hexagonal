import { useEffect, type JSX } from "react";
import { Link } from "react-router";
import useTodoStore from "../../stores/todo.store";
import TodosList from "../components/TodosList";

export default function TodosPage(): JSX.Element {
  const { listTodos, loadingTodos } = useTodoStore();

  useEffect((): void => {
    listTodos();
  }, [listTodos]);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <header className="pt-12 pb-8">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Todos
            </h1>
            <p className="text-slate-500 mt-1 text-sm">
              Manage your tasks and stay productive
            </p>
          </div>
          <Link
            to="/todos/create"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 active:scale-95 shadow-sm"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            New Todo
          </Link>
        </div>
      </header>

      {loadingTodos ? (
        <div className="flex items-center justify-center py-16">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <TodosList />
      )}
    </div>
  );
}

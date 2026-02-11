import { create } from "zustand";
import type Todo from "../../domain/entities/todo.entity";
import type { CreateTodoDto } from "../../application/services/dtos/create-todo.dto";
import TodoServiceFactory from "../factories/todo-service.factory";

interface TodoStore {
  todos: Todo[];
  loadingTodos: boolean;
  error: string | null;

  listTodos: () => Promise<void>;
  findTodoById: (id: number) => Promise<Todo | null>;
  createTodo: (dto: CreateTodoDto) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
  startTodo: (id: number) => Promise<void>;
  completeTodo: (id: number) => Promise<void>;
}

const useTodoStore = create<TodoStore>()((set, get) => ({
  todos: [],
  loadingTodos: false,
  error: null,

  listTodos: async () => {
    set({ loadingTodos: true, error: null });

    try {
      const todos: Todo[] = await TodoServiceFactory.getInstance().list();
      set({ todos });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loadingTodos: false });
    }
  },

  findTodoById: async (id: number) => {
    return TodoServiceFactory.getInstance().findById(id);
  },

  createTodo: async (dto: CreateTodoDto) => {
    const todo: Todo = await TodoServiceFactory.getInstance().create(dto);
    set({ todos: [...get().todos, todo] });
  },

  deleteTodo: async (id: number) => {
    await TodoServiceFactory.getInstance().delete(id);
    set({ todos: get().todos.filter((todo: Todo) => todo.getId() !== id) });
  },

  startTodo: async (id: number) => {
    const updated: Todo = await TodoServiceFactory.getInstance().start(id);
    set({
      todos: get().todos.map((todo: Todo) =>
        todo.getId() === id ? updated : todo,
      ),
    });
  },

  completeTodo: async (id: number) => {
    const updated: Todo = await TodoServiceFactory.getInstance().complete(id);
    set({
      todos: get().todos.map((todo: Todo) =>
        todo.getId() === id ? updated : todo,
      ),
    });
  },
}));

export default useTodoStore;

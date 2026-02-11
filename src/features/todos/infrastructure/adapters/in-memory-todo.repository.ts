import Todo from "../../domain/entities/todo.entity";
import { TodoStatus } from "../../domain/enums/todo-status.enum";
import type TodoRepository from "../../domain/ports/todo.repository";

export default class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [
    new Todo({
      id: 1,
      title: "Learn TypeScript",
      description: "Study the basics of TypeScript and its features",
      status: TodoStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Todo({
      id: 2,
      title: "Build a Todo App",
      description: "Create a simple todo application using TypeScript",
      status: TodoStatus.IN_PROGRESS,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
    new Todo({
      id: 3,
      title: "Write Tests",
      description: "Write unit tests for the todo application",
      status: TodoStatus.COMPLETED,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ];

  async create(todo: Todo): Promise<void> {
    this.todos = [...this.todos, todo];
  }

  async update(updatedTodo: Todo): Promise<void> {
    this.todos = this.todos.map((todo: Todo) =>
      todo.getId() === updatedTodo.getId() ? updatedTodo : todo,
    );
  }

  async delete(id: number): Promise<void> {
    this.todos = this.todos.filter((todo: Todo) => todo.getId() !== id);
  }

  async list(): Promise<Todo[]> {
    return this.todos;
  }

  async findById(id: number): Promise<Todo | null> {
    const todo: Todo | undefined = this.todos.find(
      (todo: Todo) => todo.getId() === id,
    );

    return todo ?? null;
  }
}

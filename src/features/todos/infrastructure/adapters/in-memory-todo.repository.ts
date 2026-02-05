import Todo from "../../domain/entities/todo.entity";
import type TodoRepository from "../../domain/ports/todo.repository";

export default class InMemoryTodoRepository implements TodoRepository {
  private todos: Todo[] = [];

  async create(todo: Todo): Promise<void> {
    this.todos = [...this.todos, todo];
  }

  async update(updatedTodo: Todo): Promise<void> {
    this.todos = this.todos.map((todo: Todo) =>
      todo.getId() === updatedTodo.getId() ? updatedTodo : todo,
    );
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

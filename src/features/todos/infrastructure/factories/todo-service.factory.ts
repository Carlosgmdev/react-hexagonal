import TodoService from "../../application/services/todo.service";
import type TodoRepository from "../../domain/ports/todo.repository";
import InMemoryTodoRepository from "../adapters/in-memory-todo.repository";

export default class TodoServiceFactory {
  private static instance: TodoService | null = null;

  static getInstance(): TodoService {
    if (!this.instance) {
      const repository: TodoRepository = new InMemoryTodoRepository();
      this.instance = new TodoService(repository);
    }

    return this.instance;
  }
}

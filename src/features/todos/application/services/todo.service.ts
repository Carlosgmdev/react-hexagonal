import type Todo from "../../domain/entities/todo.entity";
import type TodoRepository from "../../domain/ports/todo.repository";

export default class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async list(): Promise<Todo[]> {
    return this.todoRepository.list();
  }

  async findById(id: number): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }
}

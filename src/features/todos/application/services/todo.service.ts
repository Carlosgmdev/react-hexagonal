import Todo from "../../domain/entities/todo.entity";
import { TodoStatus } from "../../domain/enums/todo-status.enum";
import { TodoNotFoundException } from "../../domain/exceptions/todo-not-found.exception";
import type TodoRepository from "../../domain/ports/todo.repository";
import type { CreateTodoDto } from "./dtos/create-todo.dto";

export default class TodoService {
  constructor(private readonly todoRepository: TodoRepository) {}

  async list(): Promise<Todo[]> {
    return this.todoRepository.list();
  }

  async findById(id: number): Promise<Todo | null> {
    return this.todoRepository.findById(id);
  }

  async create(dto: CreateTodoDto): Promise<Todo> {
    const now: Date = new Date();

    const todo: Todo = new Todo({
      id: now.getTime(),
      title: dto.title,
      description: dto.description,
      status: TodoStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    });

    await this.todoRepository.create(todo);
    return todo;
  }

  async delete(id: number): Promise<void> {
    const todo: Todo | null = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundException(id);
    await this.todoRepository.delete(id);
  }

  async start(id: number): Promise<Todo> {
    const todo: Todo | null = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundException(id);
    const cloned: Todo = todo.clone();
    cloned.start();
    await this.todoRepository.update(cloned);
    return cloned;
  }

  async complete(id: number): Promise<Todo> {
    const todo: Todo | null = await this.todoRepository.findById(id);
    if (!todo) throw new TodoNotFoundException(id);
    const cloned: Todo = todo.clone();
    cloned.complete();
    await this.todoRepository.update(cloned);
    return cloned;
  }
}

import type Todo from "../entities/todo.entity";

export default interface TodoRepository {
  create(todo: Todo): Promise<void>;
  update(todo: Todo): Promise<void>;
  list(): Promise<Todo[]>;
  findById(id: number): Promise<Todo | null>;
}

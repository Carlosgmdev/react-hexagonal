import { describe, it, expect, beforeEach } from "vitest";
import InMemoryTodoRepository from "../../features/todos/infrastructure/adapters/in-memory-todo.repository";
import Todo from "../../features/todos/domain/entities/todo.entity";
import { TodoStatus } from "../../features/todos/domain/enums/todo-status.enum";

describe("InMemoryTodoRepository", () => {
  let repository: InMemoryTodoRepository;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
  });

  it("should list seeded todos", async () => {
    const todos = await repository.list();

    expect(todos.length).toBe(3);
  });

  it("should find a todo by id", async () => {
    const todo = await repository.findById(1);

    expect(todo).not.toBeNull();
    expect(todo!.getId()).toBe(1);
  });

  it("should return null for non-existent id", async () => {
    const todo = await repository.findById(999);

    expect(todo).toBeNull();
  });

  it("should create a todo", async () => {
    const newTodo = new Todo({
      id: 100,
      title: "New",
      description: "Desc",
      status: TodoStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await repository.create(newTodo);
    const todos = await repository.list();

    expect(todos.length).toBe(4);
    expect(todos[3]!.getId()).toBe(100);
  });

  it("should update a todo", async () => {
    const todo = await repository.findById(1);
    todo!.setTitle("Updated Title");
    const cloned = todo!.clone();

    await repository.update(cloned);
    const updated = await repository.findById(1);

    expect(updated!.getTitle()).toBe("Updated Title");
  });

  it("should delete a todo", async () => {
    await repository.delete(1);
    const todos = await repository.list();

    expect(todos.length).toBe(2);
    expect(await repository.findById(1)).toBeNull();
  });
});

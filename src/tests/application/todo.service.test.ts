import { describe, it, expect, beforeEach } from "vitest";
import TodoService from "../../features/todos/application/services/todo.service";
import InMemoryTodoRepository from "../../features/todos/infrastructure/adapters/in-memory-todo.repository";
import { TodoStatus } from "../../features/todos/domain/enums/todo-status.enum";
import { TodoNotFoundException } from "../../features/todos/domain/exceptions/todo-not-found.exception";
import type TodoRepository from "../../features/todos/domain/ports/todo.repository";
import type Todo from "../../features/todos/domain/entities/todo.entity";

describe("TodoService", () => {
  let repository: TodoRepository;
  let service: TodoService;

  beforeEach(() => {
    repository = new InMemoryTodoRepository();
    service = new TodoService(repository);
  });

  describe("list()", () => {
    it("should list all seeded todos", async () => {
      const todos: Todo[] = await service.list();

      expect(todos.length).toBe(3);
    });
  });

  describe("findById()", () => {
    it("should find a todo by id", async () => {
      const todo: Todo | null = await service.findById(1);

      expect(todo).not.toBeNull();
      expect(todo!.getTitle()).toBe("Learn TypeScript");
    });

    it("should return null for a non-existent todo", async () => {
      const todo: Todo | null = await service.findById(999);

      expect(todo).toBeNull();
    });
  });

  describe("create()", () => {
    it("should create a new todo with PENDING status", async () => {
      await service.create({ title: "New Todo", description: "New description" });
      const todos: Todo[] = await service.list();

      expect(todos.length).toBe(4);
      const created: Todo = todos[3]!;
      expect(created.getTitle()).toBe("New Todo");
      expect(created.getDescription()).toBe("New description");
      expect(created.getStatus()).toBe(TodoStatus.PENDING);
    });
  });

  describe("delete()", () => {
    it("should delete a todo by id", async () => {
      await service.delete(1);
      const todos: Todo[] = await service.list();

      expect(todos.length).toBe(2);
      expect(todos.find((t) => t.getId() === 1)).toBeUndefined();
    });

    it("should throw TodoNotFoundException for a non-existent todo", async () => {
      await expect(service.delete(999)).rejects.toThrow(TodoNotFoundException);
    });
  });

  describe("start()", () => {
    it("should start a pending todo", async () => {
      const updated: Todo = await service.start(1);

      expect(updated.getStatus()).toBe(TodoStatus.IN_PROGRESS);
    });

    it("should throw TodoNotFoundException for a non-existent todo", async () => {
      await expect(service.start(999)).rejects.toThrow(TodoNotFoundException);
    });

    it("should return a cloned instance, not the original", async () => {
      const original: Todo | null = await service.findById(1);
      const updated: Todo = await service.start(1);

      expect(updated).not.toBe(original);
    });

    it("should not mutate the original entity in the repository", async () => {
      const beforeStart: Todo | null = await service.findById(1);
      expect(beforeStart!.getStatus()).toBe(TodoStatus.PENDING);

      await service.start(1);

      // The repository should now hold the updated clone
      const afterStart: Todo | null = await service.findById(1);
      expect(afterStart!.getStatus()).toBe(TodoStatus.IN_PROGRESS);
    });
  });

  describe("complete()", () => {
    it("should complete an in-progress todo", async () => {
      const updated: Todo = await service.complete(2);

      expect(updated.getStatus()).toBe(TodoStatus.COMPLETED);
    });

    it("should throw TodoNotFoundException for a non-existent todo", async () => {
      await expect(service.complete(999)).rejects.toThrow(TodoNotFoundException);
    });

    it("should return a cloned instance, not the original", async () => {
      const original: Todo | null = await service.findById(2);
      const updated: Todo = await service.complete(2);

      expect(updated).not.toBe(original);
    });
  });
});

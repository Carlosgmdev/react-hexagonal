import { describe, it, expect } from "vitest";
import Todo from "../../features/todos/domain/entities/todo.entity";
import { TodoStatus } from "../../features/todos/domain/enums/todo-status.enum";
import { InvalidTodoException } from "../../features/todos/domain/exceptions/invalid-todo.exception";
import { InvalidTodoStatusTransitionException } from "../../features/todos/domain/exceptions/invalid-todo-status-transition.exception";

function createTodo(overrides: Partial<{ status: TodoStatus }> = {}): Todo {
  return new Todo({
    id: 1,
    title: "Test Todo",
    description: "Test description",
    status: overrides.status ?? TodoStatus.PENDING,
    createdAt: new Date("2026-01-01"),
    updatedAt: new Date("2026-01-01"),
  });
}

describe("Todo Entity", () => {
  describe("construction", () => {
    it("should create a todo with the correct properties", () => {
      const todo = createTodo();

      expect(todo.getId()).toBe(1);
      expect(todo.getTitle()).toBe("Test Todo");
      expect(todo.getDescription()).toBe("Test description");
      expect(todo.getStatus()).toBe(TodoStatus.PENDING);
    });

    it("should throw InvalidTodoException for empty title", () => {
      expect(
        () =>
          new Todo({
            id: 1,
            title: "  ",
            description: "Valid",
            status: TodoStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
      ).toThrow(InvalidTodoException);
    });

    it("should throw InvalidTodoException for empty description", () => {
      expect(
        () =>
          new Todo({
            id: 1,
            title: "Valid",
            description: "",
            status: TodoStatus.PENDING,
            createdAt: new Date(),
            updatedAt: new Date(),
          }),
      ).toThrow(InvalidTodoException);
    });
  });

  describe("setTitle()", () => {
    it("should update the title and touch updatedAt", () => {
      const todo = createTodo();
      const oldUpdatedAt = todo.getUpdatedAt();

      todo.setTitle("Updated Title");

      expect(todo.getTitle()).toBe("Updated Title");
      expect(todo.getUpdatedAt().getTime()).toBeGreaterThanOrEqual(oldUpdatedAt.getTime());
    });

    it("should throw InvalidTodoException for empty title", () => {
      const todo = createTodo();

      expect(() => todo.setTitle("")).toThrow(InvalidTodoException);
    });
  });

  describe("setDescription()", () => {
    it("should update the description and touch updatedAt", () => {
      const todo = createTodo();

      todo.setDescription("Updated Description");

      expect(todo.getDescription()).toBe("Updated Description");
    });

    it("should throw InvalidTodoException for empty description", () => {
      const todo = createTodo();

      expect(() => todo.setDescription("  ")).toThrow(InvalidTodoException);
    });
  });

  describe("start()", () => {
    it("should transition from PENDING to IN_PROGRESS", () => {
      const todo = createTodo({ status: TodoStatus.PENDING });

      todo.start();

      expect(todo.getStatus()).toBe(TodoStatus.IN_PROGRESS);
    });

    it("should throw InvalidTodoStatusTransitionException if already in progress", () => {
      const todo = createTodo({ status: TodoStatus.IN_PROGRESS });

      expect(() => todo.start()).toThrow(InvalidTodoStatusTransitionException);
    });

    it("should throw InvalidTodoStatusTransitionException if already completed", () => {
      const todo = createTodo({ status: TodoStatus.COMPLETED });

      expect(() => todo.start()).toThrow(InvalidTodoStatusTransitionException);
    });
  });

  describe("complete()", () => {
    it("should transition from IN_PROGRESS to COMPLETED", () => {
      const todo = createTodo({ status: TodoStatus.IN_PROGRESS });

      todo.complete();

      expect(todo.getStatus()).toBe(TodoStatus.COMPLETED);
    });

    it("should throw InvalidTodoStatusTransitionException if still pending", () => {
      const todo = createTodo({ status: TodoStatus.PENDING });

      expect(() => todo.complete()).toThrow(InvalidTodoStatusTransitionException);
    });

    it("should throw InvalidTodoStatusTransitionException if already completed", () => {
      const todo = createTodo({ status: TodoStatus.COMPLETED });

      expect(() => todo.complete()).toThrow(InvalidTodoStatusTransitionException);
    });
  });

  describe("clone()", () => {
    it("should create a new instance with the same data", () => {
      const todo = createTodo();
      const cloned = todo.clone();

      expect(cloned).not.toBe(todo);
      expect(cloned.getId()).toBe(todo.getId());
      expect(cloned.getTitle()).toBe(todo.getTitle());
      expect(cloned.getDescription()).toBe(todo.getDescription());
      expect(cloned.getStatus()).toBe(todo.getStatus());
    });

    it("should not be affected by mutations on the original", () => {
      const todo = createTodo();
      const cloned = todo.clone();

      todo.setTitle("Mutated");

      expect(cloned.getTitle()).toBe("Test Todo");
    });
  });
});

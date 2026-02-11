import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Todo from "../../features/todos/domain/entities/todo.entity";
import { TodoStatus } from "../../features/todos/domain/enums/todo-status.enum";
import TodoItem from "../../features/todos/infrastructure/ui/components/TodoItem";

function createTodo(status: TodoStatus = TodoStatus.PENDING): Todo {
  return new Todo({
    id: 1,
    title: "Test Todo",
    description: "Test description",
    status,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
}

describe("TodoItem", () => {
  it("should render the todo title as a link", () => {
    render(
      <MemoryRouter>
        <TodoItem todo={createTodo()} />
      </MemoryRouter>,
    );

    const link = screen.getByText("Test Todo");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/todos/1");
  });

  it("should render the description", () => {
    render(
      <MemoryRouter>
        <TodoItem todo={createTodo()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should show 'Start' button for PENDING todos", () => {
    render(
      <MemoryRouter>
        <TodoItem todo={createTodo(TodoStatus.PENDING)} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Start")).toBeInTheDocument();
    expect(screen.queryByText("Complete")).not.toBeInTheDocument();
  });

  it("should show 'Complete' button for IN_PROGRESS todos", () => {
    render(
      <MemoryRouter>
        <TodoItem todo={createTodo(TodoStatus.IN_PROGRESS)} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Complete")).toBeInTheDocument();
    expect(screen.queryByText("Start")).not.toBeInTheDocument();
  });

  it("should not show action buttons for COMPLETED todos", () => {
    render(
      <MemoryRouter>
        <TodoItem todo={createTodo(TodoStatus.COMPLETED)} />
      </MemoryRouter>,
    );

    expect(screen.queryByText("Start")).not.toBeInTheDocument();
    expect(screen.queryByText("Complete")).not.toBeInTheDocument();
  });

  it("should always show the Delete button", () => {
    render(
      <MemoryRouter>
        <TodoItem todo={createTodo()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("Delete")).toBeInTheDocument();
  });
});

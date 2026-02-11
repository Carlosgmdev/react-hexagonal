import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import TodosPage from "../../features/todos/infrastructure/ui/pages/TodosPage";
import useTodoStore from "../../features/todos/infrastructure/stores/todo.store";

describe("TodosPage", () => {
  beforeEach(() => {
    useTodoStore.setState({
      todos: [],
      loadingTodos: false,
      error: null,
      listTodos: async () => {},
    });
  });

  it("should render the title", () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Todos")).toBeInTheDocument();
  });

  it("should render the 'New Todo' link", () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    const link = screen.getByText("New Todo");
    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/todos/create");
  });

  it("should show loading state", () => {
    useTodoStore.setState({ loadingTodos: true });

    const { container } = render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("should show empty state when no todos", () => {
    render(
      <MemoryRouter>
        <TodosPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("No todos yet")).toBeInTheDocument();
  });
});

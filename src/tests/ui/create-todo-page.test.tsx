import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import CreateTodoPage from "../../features/todos/infrastructure/ui/pages/CreateTodoPage";
import useTodoStore from "../../features/todos/infrastructure/stores/todo.store";

describe("CreateTodoPage", () => {
  beforeEach(() => {
    useTodoStore.setState({ todos: [], loadingTodos: false, error: null });
  });

  it("should render the form", () => {
    render(
      <MemoryRouter>
        <CreateTodoPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("Create Todo", { selector: "h1" })).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Create Todo" })).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("should show an error if title is empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CreateTodoPage />
      </MemoryRouter>,
    );

    await user.click(screen.getByRole("button", { name: "Create Todo" }));

    expect(screen.getByText("Title is required.")).toBeInTheDocument();
  });

  it("should show an error if description is empty", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CreateTodoPage />
      </MemoryRouter>,
    );

    await user.type(screen.getByLabelText("Title"), "My Todo");
    await user.click(screen.getByRole("button", { name: "Create Todo" }));

    expect(screen.getByText("Description is required.")).toBeInTheDocument();
  });

  it("should allow typing into both fields", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <CreateTodoPage />
      </MemoryRouter>,
    );

    const titleInput = screen.getByLabelText("Title");
    const descInput = screen.getByLabelText("Description");

    await user.type(titleInput, "Test Title");
    await user.type(descInput, "Test Desc");

    expect(titleInput).toHaveValue("Test Title");
    expect(descInput).toHaveValue("Test Desc");
  });
});

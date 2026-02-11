import { TodoStatus } from "../enums/todo-status.enum";
import { InvalidTodoException } from "../exceptions/invalid-todo.exception";
import { InvalidTodoStatusTransitionException } from "../exceptions/invalid-todo-status-transition.exception";

export interface TodoProps {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdAt: Date;
  updatedAt: Date;
}

export default class Todo {
  private readonly id: number;
  private title: string;
  private description: string;
  private status: TodoStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(props: TodoProps) {
    this.validateProps(props);

    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.status = props.status;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  private validateProps(props: TodoProps): void {
    if (!props.title.trim()) {
      throw new InvalidTodoException("title cannot be empty.");
    }

    if (!props.description.trim()) {
      throw new InvalidTodoException("description cannot be empty.");
    }
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    if (!title.trim()) {
      throw new InvalidTodoException("title cannot be empty.");
    }

    this.title = title;
    this.touchUpdatedAt();
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
    if (!description.trim()) {
      throw new InvalidTodoException("description cannot be empty.");
    }

    this.description = description;
    this.touchUpdatedAt();
  }

  getStatus(): TodoStatus {
    return this.status;
  }

  getCreatedAt(): Date {
    return this.createdAt;
  }

  getUpdatedAt(): Date {
    return this.updatedAt;
  }

  private touchUpdatedAt(): void {
    this.updatedAt = new Date();
  }

  start(): void {
    if (this.status === TodoStatus.IN_PROGRESS) {
      throw new InvalidTodoStatusTransitionException(this.status, TodoStatus.IN_PROGRESS);
    }

    if (this.status === TodoStatus.COMPLETED) {
      throw new InvalidTodoStatusTransitionException(this.status, TodoStatus.IN_PROGRESS);
    }

    this.status = TodoStatus.IN_PROGRESS;
    this.touchUpdatedAt();
  }

  complete(): void {
    if (this.status === TodoStatus.PENDING) {
      throw new InvalidTodoStatusTransitionException(this.status, TodoStatus.COMPLETED);
    }

    if (this.status === TodoStatus.COMPLETED) {
      throw new InvalidTodoStatusTransitionException(this.status, TodoStatus.COMPLETED);
    }

    this.status = TodoStatus.COMPLETED;
    this.touchUpdatedAt();
  }

  clone(): Todo {
    return new Todo({
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }
}

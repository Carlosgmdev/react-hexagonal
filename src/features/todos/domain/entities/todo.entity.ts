import { TodoStatus } from "../enums/todo-status.enum";

export default class Todo {
  private readonly id: number;
  private title: string;
  private description: string;
  private status: TodoStatus;
  private readonly createdAt: Date;
  private updatedAt: Date;

  constructor(todo: {
    id: number;
    title: string;
    description: string;
    status: TodoStatus;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = todo.id;
    this.title = todo.title;
    this.description = todo.description;
    this.status = todo.status;
    this.createdAt = todo.createdAt;
    this.updatedAt = todo.updatedAt;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string): void {
    this.title = title;
    this.touchUpdatedAt();
  }

  getDescription(): string {
    return this.description;
  }

  setDescription(description: string): void {
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
    if (this.status === TodoStatus.IN_PROGRESS)
      throw new Error("Todo is already in progress.");

    if (this.status === TodoStatus.COMPLETED)
      throw new Error("Cannot start a completed todo.");

    this.status = TodoStatus.IN_PROGRESS;
    this.touchUpdatedAt();
  }

  complete(): void {
    if (this.status === TodoStatus.PENDING)
      throw new Error("Cannot complete a pending todo.");

    if (this.status === TodoStatus.COMPLETED)
      throw new Error("Todo is already completed.");

    this.status = TodoStatus.COMPLETED;
    this.touchUpdatedAt();
  }
}

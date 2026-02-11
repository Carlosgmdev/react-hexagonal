import { DomainException } from "./domain.exception";

export class TodoNotFoundException extends DomainException {
  constructor(id: number) {
    super(`Todo with id ${id} not found.`);
  }
}

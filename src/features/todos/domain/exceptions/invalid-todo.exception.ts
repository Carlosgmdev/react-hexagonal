import { DomainException } from "./domain.exception";

export class InvalidTodoException extends DomainException {
  constructor(reason: string) {
    super(`Invalid todo: ${reason}`);
  }
}

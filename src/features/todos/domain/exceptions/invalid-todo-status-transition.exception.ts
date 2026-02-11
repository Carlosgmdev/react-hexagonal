import { DomainException } from "./domain.exception";

export class InvalidTodoStatusTransitionException extends DomainException {
  constructor(from: string, to: string) {
    super(`Cannot transition from "${from}" to "${to}".`);
  }
}

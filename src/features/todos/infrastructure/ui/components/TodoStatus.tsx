import type { JSX } from "react";
import { TodoStatus as TodoStatusEnum } from "../../../domain/enums/todo-status.enum";

type TodoStatusProps = {
  status: TodoStatusEnum;
};

const STATUS_STYLES: Record<TodoStatusEnum, string> = {
  [TodoStatusEnum.PENDING]:
    "bg-amber-50 text-amber-700 border-amber-200",
  [TodoStatusEnum.IN_PROGRESS]:
    "bg-blue-50 text-blue-700 border-blue-200",
  [TodoStatusEnum.COMPLETED]:
    "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const STATUS_DOTS: Record<TodoStatusEnum, string> = {
  [TodoStatusEnum.PENDING]: "bg-amber-500",
  [TodoStatusEnum.IN_PROGRESS]: "bg-blue-500",
  [TodoStatusEnum.COMPLETED]: "bg-emerald-500",
};

const STATUS_LABELS: Record<TodoStatusEnum, string> = {
  [TodoStatusEnum.PENDING]: "Pending",
  [TodoStatusEnum.IN_PROGRESS]: "In Progress",
  [TodoStatusEnum.COMPLETED]: "Completed",
};

export default function TodoStatus({ status }: TodoStatusProps): JSX.Element {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-full border ${STATUS_STYLES[status]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOTS[status]}`} />
      {STATUS_LABELS[status]}
    </span>
  );
}

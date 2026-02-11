import { Routes, Route } from "react-router";
import TodosPage from "./features/todos/infrastructure/ui/pages/TodosPage";
import CreateTodoPage from "./features/todos/infrastructure/ui/pages/CreateTodoPage";
import TodoDetailPage from "./features/todos/infrastructure/ui/pages/TodoDetailPage";

function App() {
  return (
    <div className="min-h-screen pb-16">
      <Routes>
        <Route path="/" element={<TodosPage />} />
        <Route path="/todos/create" element={<CreateTodoPage />} />
        <Route path="/todos/:id" element={<TodoDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

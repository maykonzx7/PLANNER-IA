import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TaskList from "./pages/TaskList";
import TaskForm from "./pages/TaskForm";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TaskList />} />
        {/* Rotas extras para expansão futura */}
        <Route
          path="/profile"
          element={
            <div className="min-h-screen flex items-center justify-center">
              Perfil do Usuário
            </div>
          }
        />
        <Route
          path="/history"
          element={
            <div className="min-h-screen flex items-center justify-center">
              Histórico de Ações
            </div>
          }
        />
        <Route
          path="/settings"
          element={
            <div className="min-h-screen flex items-center justify-center">
              Configurações
            </div>
          }
        />
        <Route path="/tasks/new" element={<TaskForm />} />
        <Route
          path="/tasks/:id/edit"
          element={
            <div className="min-h-screen flex items-center justify-center">
              Editar Tarefa
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTasks(data);
        } else {
          if (data.message === "Token não fornecido.") {
            setError("Erro: Token não fornecido. Faça login novamente.");
          } else if (data.message === "Usuário não autenticado.") {
            setError(
              "Erro: Usuário não autenticado. Faça login para visualizar suas tarefas."
            );
          } else {
            setError(
              data.message ||
                "Erro ao buscar tarefas. Tente novamente mais tarde."
            );
          }
        }
      } catch (err) {
        setError("Erro ao conectar ao servidor");
      }
      setLoading(false);
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Lista de Tarefas</h1>
      <div className="bg-white p-6 rounded shadow">
        {loading ? (
          <p>Carregando...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : tasks.length === 0 ? (
          <p>Nenhuma tarefa encontrada.</p>
        ) : (
          <ul className="mb-4">
            {tasks.map((task) => (
              <li
                key={task._id}
                className="border-b py-2 flex justify-between items-center"
              >
                <span>{task.title}</span>
                <span className="text-xs text-gray-500">{task.status}</span>
              </li>
            ))}
          </ul>
        )}
        <button
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigate("/tasks/new")}
        >
          Nova Tarefa
        </button>
      </div>
    </div>
  );
};

export default TaskList;

import React, { useEffect, useState } from "react";
import api from "../services/api";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Busca tarefas ao carregar
  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError("Erro ao buscar tarefas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreate(data) {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await api.post("/api/tasks", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError("Erro ao criar tarefa.");
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(data) {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await api.put(`/api/tasks/${editingTask._id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError("Erro ao editar tarefa.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(task) {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      setError("Erro ao excluir tarefa.");
    } finally {
      setLoading(false);
    }
  }

  function openEdit(task) {
    setEditingTask(task);
    setShowForm(true);
  }

  function openCreate() {
    setEditingTask(null);
    setShowForm(true);
  }

  function closeForm() {
    setEditingTask(null);
    setShowForm(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="mb-6 flex justify-between items-center">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={openCreate}
        >
          Nova Tarefa
        </button>
        {loading && <span className="text-blue-600">Carregando...</span>}
      </div>
      {error && <div className="text-red-600 mb-4">{error}</div>}
      {showForm && (
        <div className="mb-6 bg-white p-6 rounded shadow">
          <TaskForm
            onSubmit={editingTask ? handleEdit : handleCreate}
            initialData={editingTask || {}}
            loading={loading}
          />
          <button
            className="mt-4 text-gray-500 hover:text-gray-700"
            onClick={closeForm}
          >
            Cancelar
          </button>
        </div>
      )}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Minhas Tarefas</h2>
        <TaskList tasks={tasks} onEdit={openEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default Dashboard;

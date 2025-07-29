import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, description, dateTime }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/tasks");
      } else {
        setError(data.error || "Erro ao criar tarefa. Tente novamente.");
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Nova Tarefa</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Título"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            className="border p-2 rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
          />
          <input
            type="datetime-local"
            className="border p-2 rounded"
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-center">{error}</div>}
          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Criando..." : "Criar Tarefa"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;

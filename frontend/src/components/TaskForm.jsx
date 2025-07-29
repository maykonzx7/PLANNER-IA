import React, { useState, useEffect } from "react";

/**
 * Componente para criar ou editar uma tarefa
 * Props:
 * - onSubmit: função chamada ao enviar o formulário
 * - initialData: dados iniciais para edição (opcional)
 * - loading: booleano para estado de carregamento
 */
export default function TaskForm({ onSubmit, initialData = {}, loading }) {
  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [dateTime, setDateTime] = useState(initialData.dateTime || "");
  const [category, setCategory] = useState(initialData.category || "");
  const [status, setStatus] = useState(initialData.status || "pendente");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDateTime(initialData.dateTime || "");
      setCategory(initialData.category || "");
      setStatus(initialData.status || "pendente");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, description, dateTime, category, status });
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Descrição"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="datetime-local"
        value={dateTime}
        onChange={(e) => setDateTime(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Categoria"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="pendente">Pendente</option>
        <option value="concluida">Concluída</option>
      </select>
      <button
        type="submit"
        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading
          ? "Salvando..."
          : initialData._id
          ? "Salvar alterações"
          : "Criar tarefa"}
      </button>
    </form>
  );
}

import React from "react";

/**
 * Componente para exibir uma tarefa individual
 * Props:
 * - task: objeto da tarefa
 * - onEdit: função chamada ao clicar em editar
 * - onDelete: função chamada ao clicar em excluir
 */
export default function TaskItem({ task, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 flex flex-col gap-2 bg-white shadow">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-lg">{task.title}</h3>
        <span
          className={`px-2 py-1 rounded text-xs ${
            task.status === "concluida"
              ? "bg-green-200 text-green-800"
              : "bg-yellow-200 text-yellow-800"
          }`}
        >
          {task.status}
        </span>
      </div>
      <p className="text-gray-700">{task.description}</p>
      <div className="flex gap-2 text-sm text-gray-500">
        <span>{task.category}</span>
        <span>{new Date(task.dateTime).toLocaleString()}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <button
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          onClick={() => onEdit(task)}
        >
          Editar
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => onDelete(task)}
        >
          Excluir
        </button>
      </div>
    </div>
  );
}

import React from "react";
import TaskItem from "./TaskItem";

/**
 * Componente para listar tarefas
 * Props:
 * - tasks: array de tarefas
 * - onEdit: função chamada ao editar
 * - onDelete: função chamada ao excluir
 */
export default function TaskList({ tasks, onEdit, onDelete }) {
  if (!tasks || tasks.length === 0) {
    return <div className="text-gray-500">Nenhuma tarefa encontrada.</div>;
  }
  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

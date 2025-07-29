import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Resumo</h2>
          <p>Bem-vindo ao Planner-IA!</p>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Estatísticas</h2>
          <p>Em breve: estatísticas de tarefas e produtividade.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

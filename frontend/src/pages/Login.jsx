import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Salvar token e redirecionar
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        if (data.message === "Token não fornecido.") {
          setError(
            "Erro: Token não fornecido. Faça login novamente ou contate o suporte."
          );
        } else if (data.message === "Usuário não encontrado.") {
          setError(
            "Erro: Usuário não encontrado. Verifique seu e-mail ou cadastre-se."
          );
        } else {
          setError(
            data.message ||
              "Credenciais inválidas. Verifique seus dados e tente novamente."
          );
        }
      }
    } catch (err) {
      setError("Erro ao conectar ao servidor");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-center">{error}</div>}
          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-600 hover:underline">
            Não tem conta? Cadastre-se
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

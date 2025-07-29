// Serviço para integração com IA via Gemini (Google AI)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function gerarSugestaoTarefa(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const body = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-goog-api-key": apiKey,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("Erro na requisição Gemini");
  const data = await res.json();
  return data;
}

module.exports = {
  gerarSugestaoTarefa,
};

// Ponto de entrada do backend
require("dotenv").config();

if (!process.env.JWT_SECRET) {
  console.error("❌ FATAL ERROR: JWT_SECRET não está definido no .env");
  process.exit(1); // Encerra o servidor
}

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

app.use(cors());
app.use(express.json());

// Conexão com o MongoDB
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/";
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Conectado ao MongoDB!"))
  .catch((err) => console.error("❌ Erro ao conectar ao MongoDB:", err));

// Rota inicial
app.get("/", (req, res) => {
  res.send("Planner-IA Backend rodando!");
});

const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

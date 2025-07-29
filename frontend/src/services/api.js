// Instância do Axios para requisições à API
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export default api;

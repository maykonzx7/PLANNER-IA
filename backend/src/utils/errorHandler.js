// Middleware de tratamento de erros
module.exports = (err, req, res, next) => {
  res.status(500).json({ error: err.message });
};

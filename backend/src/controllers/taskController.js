const Task = require("../models/Task");

exports.getAll = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { title, description, dateTime, status, category } = req.body;
    const task = await Task.create({
      userId: req.userId,
      title,
      description,
      dateTime,
      status,
      category,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.userId },
      updates,
      { new: true }
    );
    if (!task) return res.status(404).json({ error: "Task não encontrada." });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) return res.status(404).json({ error: "Task não encontrada." });
    res.json({ message: "Task removida com sucesso." });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

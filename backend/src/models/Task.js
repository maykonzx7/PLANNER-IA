const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    dateTime: { type: Date },
    status: { type: String, default: "pending" },
    category: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);

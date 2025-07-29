const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../utils/auth");

router.get("/", auth, taskController.getAll);
router.post("/", auth, taskController.create);
router.put("/:id", auth, taskController.update);
router.delete("/:id", auth, taskController.remove);

module.exports = router;

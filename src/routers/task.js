const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController.js");
const auth = require("../middleware/auth");

router.post("/tasks", auth, taskController.createTask);

router.get("/tasks", auth, taskController.getAllTasks);
router.get("/tasks/:id", auth, taskController.getTask);
router.patch("/tasks/:id", auth, taskController.updateTask);
router.delete("/tasks/:id", auth, taskController.deleteTask);

module.exports = router;

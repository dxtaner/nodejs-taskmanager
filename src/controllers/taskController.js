const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      owner: req.user._id,
    });
    await task.save();
    res.status(201).send({ success: true, task });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const getAllTasks = async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const [field, order] = req.query.sortBy.split(":");
    sort[field] = order === "desc" ? -1 : 1;
  }

  try {
    const tasks = await Task.find({ owner: req.user._id, ...match })
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
      .sort(sort)
      .populate("owner");
    res.send({ success: true, tasks });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

const getTask = async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await Task.findOne({ _id, owner: req.user._id });
    if (!task) {
      return res.status(404).send({ success: false, error: "Task not found" });
    }
    res.send({ success: true, task });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ success: false, error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ success: false, error: "Task not found" });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send({ success: true, task });
  } catch (e) {
    res.status(400).send({ success: false, error: e.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ success: false, error: "Task not found" });
    }

    res.send({ success: true, task });
  } catch (e) {
    res.status(500).send({ success: false, error: e.message });
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  updateTask,
  deleteTask,
};

const Task = require("./Task");
const express = require("express");
const router = express.Router();
const app = express();

//create a new task
router.post("/tasks", async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});
//get all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.send(tasks);
  } catch {
    res.status(500).send(error);
  }
});
//get task by id
router.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send({ message: "Task not found" });
    res.send(task);
  } catch {
    res.status(500).send(error);
  }
});
//update a task by id
router.put("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch {
    res.status(500).send(error);
  }
});
//delete a task by id
router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch {
    res.status(500).send(error);
  }
});

module.exports = router;

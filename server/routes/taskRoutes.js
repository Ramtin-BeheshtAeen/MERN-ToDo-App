import User from "../models/user.js";
import Task from "../models/task.js";
import Container from "../models/container.js";
import List from "../models/list.js";

import express from "express";
const router = express.Router();

//get all to-do of a specific user:
router.get("/:userId", async (req, res) => {
  //destruct the Param:
  const { userId } = req.params;
  try {
    // Find the default container for the user
    const container = await Container.findOne({
      user: userId,
      name: "Default Container",
    });
    if (!container) {
      throw new Error("Default container not found");
    }

    // Find the default list in the default container
    const list = await List.findOne({
      container: container._id,
      name: "Default List",
    });
    if (!list) {
      throw new Error("Default list not found");
    }

    // Find tasks in the default list
    const tasks = await Task.find({ list: list._id }).populate("list").exec();

    res.json(tasks);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error fetching user tasks",
      error_detail: err,
    });
  }
});

//add new to-do:
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { title, dueDate, dueTime, priority, urgency, status, createdAt } =
    req.body;

  // console.log( title,
  //   dueDate,
  //   dueTime,
  //   priority,
  //   urgency,
  //   status,
  //   createdAt)

  try {
    const task = new Task({
      title: title,
      dueDate: new Date(dueDate),
      dueTime: dueTime,
      priority: priority,
      urgency: urgency,
      status: status,
      createdAt: new Date(createdAt),
      user: userId,
    });

    await task.save();

    const user = await User.findById(userId);
    user.tasks.push(task._id);
    await user.save();

    res.status(201).send(task);
  } catch (err) {
    console.log("\n err in server.js \n");
    console.log(err);
  }
});

//edit to-do:
router.put("/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;
  const { title, dueDate, dueTime, priority, urgency, status, updatedAt } =
    req.body;

  // console.log( title,
  //   dueDate,
  //   dueTime,
  //   priority,
  //   urgency,
  //   status,
  //   createdAt)

  try {
    // Find the user by their ID
    const user = await User.findById(userId).populate("tasks");

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Locate the specific task within the user's tasks
    const task = user.tasks.find((task) => task._id.toString() === taskId);

    if (!task) {
      return res.status(404).send({ message: "Task not found" });
    }

    // Update the task fields
    task.title = title;
    task.dueDate = new Date(dueDate);
    task.dueTime = dueTime;
    task.priority = priority;
    task.urgency = urgency;
    task.status = status;
    task.updatedAt = new Date(updatedAt);

    await task.save();
    await user.save();

    res.status(200).send(task);
  } catch (err) {
    console.log("\n err in server.js put route \n");
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

//delete to-do:
router.delete("/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    // Locate the specific task within the user's tasks
    const taskIndex = user.tasks.indexOf(taskId);
    if (taskIndex > -1) {
      //user.tasks.splice(taskIndex, 1); removes the task ID at the position
      // taskIndex from the user.tasks array. This effectively removes the
      // reference to the task from the user’s list of tasks.
      user.tasks.splice(taskIndex, 1);
      await Task.findByIdAndDelete(taskId);
      await user.save();
      res.status(200).send({ message: "Task deleted successfully" });
    } else {
      res.status(404).send({ message: "Task not found" });
    }
  } catch (err) {
    console.log("\n err in server.js delete route\n");
    console.log(err);
    res.status(500).send({ message: "Internal server error" });
  }
});

//setTaskDoneFunction
router.get("/set-task-done-function", async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).send("Error populating database");
  }
});

export default router;

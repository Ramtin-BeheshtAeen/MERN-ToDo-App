const PORT = process.env.PORT ?? 8000;
import express from "express";
import cors from "cors";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import connectDB from "./Db.js";
import populateDatabase from "./test/addRandomDataToDb.js";
import getUserTasks from "./utils/getuserTasks.js";

import User from "./models/user.js";
import Task from "./models/task.js";

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

//get all to-do of a specific user:
app.get("/todo/:userId", async (req, res) => {
  //destruct the Param:
  const { userId } = req.params;
  try {
    const tasks = await getUserTasks(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      error: "Error fetching user tasks",
    });
  }
});

//add new to-do:
app.post("/post-to-do/:userId", async (req, res) => {
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
app.put("/edit-to-do/:userId/:taskId", async (req, res) => {
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
app.delete("/delete-to-do/:userId/:taskId", async (req, res) => {
  const { userId, taskId } = req.params;

  try {
    // Find the user by their ID
    const user = await User.findById(userId)
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


//Sign Up
app.post('/signup', async(req, res) => {
  const {name, lastName, email, password} = req.body
  console.log(name, lastName, email, password)
  //First Hash the Password:
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)

  try {
    const newUser = new User({
      name: name,
      lastName: lastName,
      email: email,
      password: hashedPassword,
     });

    await newUser.save();

    const token = jwt.sign({email}, 'secret', {expireIn : '1hr'})
    res.json({email:email, token:token})

    // res.status(201).send('User registered successfully');
  
  }catch (err) {
    if (err){
      // res.status(400).send('Error registering user');
      res.json(err)
    }
    
  }
})


//Login



//Testing:
app.get("/test/addRandomUserAndTasks", async (req, res) => {
  try {
    await populateDatabase();
    res.send("Database populated with random user and tasks");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error populating database");
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Container from "../models/container.js"
import List from "../models/list.js"
import Task from "../models/task.js"

const router = express.Router();

//Sign Up
router.post("/signup", async (req, res) => {
  const { name, lastName, email, password } = req.body;

  //First Hash the Password:
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  try {
    const newUser = new User({
      name: name,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

     // Create the default container
     const container = new Container({
      name: 'Default Container',
      user: newUser._id,
    });
    await container.save();

    // Create the default list
    const list = new List({
      name: 'Default List',
      container: container._id,
    });
    await list.save();

    // Create the default task
    const task = new Task({
      title: 'Create Your First Task',
      dueDate: new Date(),
      dueTime: '12:00',
      user: newUser._id,
      list: list._id,
    });
    await task.save();

    // Update references
    newUser.containers.push(container._id);
    await newUser.save();

    container.lists.push(list._id);
    await container.save();

    list.tasks.push(task._id);
    await list.save();

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res
      .status(201)
      .json({
        name: newUser.name,
        lastName: newUser.lastName,
        email: email,
        token: token,
        _id: newUser._id,
      });
  } catch (err) {
    if (err) {
      // res.status(400).send('Error registering user');
      console.log(err);
      res.json(err);
    }
  }
});

//Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //First Find the User:
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    // compere input password with user saved one:
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //create token:
    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res
      .status(201)
      .json({
        name: user.name,
        lastName: user.lastName,
        email: email,
        token: token,
        _id: user._id,
      });
  } catch (err) {
    if (err) {
      // res.status(400).send('Error registering user');
      console.log(err);
      res.json(err);
    }
  }
});

export default router;
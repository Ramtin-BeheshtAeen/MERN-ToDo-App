import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

//Sign Up
app.post("/signup", async (req, res) => {
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
app.post("/login", async (req, res) => {
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

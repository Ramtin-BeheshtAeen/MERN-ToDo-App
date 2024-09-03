import express from "express";
import User from "../models/user.js";
import Container from "../models/container.js";

const router = express.Router();

//Getting All Containers Of User:
router.get('/:userId/:containerId', async (req, res) => {
  const {userId, containerId} = req.params
  console.log(userId)
  try {

    const userContainer = await Container.findOne()


    if (!user) {
      return res.status(404).json({message: "user not found"})
    }

    res.status(200).json(user.containers)
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: error.message});
  }
}) 




export default router;
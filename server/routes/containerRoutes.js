import express from "express";
import User from "../models/user.js";
import Container from "../models/container.js";

const router = express.Router();

//Getting All Containers Of User:
router.get('/:userId', async (req, res) => {
  const {userId} = req.params

  try {
    const user = await User.findById(userId).populate({
      path: 'containers',
      populate: {
        path: 'lists'
      }

    })

    if (!user) {
      return res.status(404).json({message: "user not found"})
    }
    res.status(200).json(user.containers)
  } catch(error) {
    console.log(error)
    res.status(500).json({ message: error.message});
  }
}) 


//Create a New Container:
router.post('/new-container/:userId', async (req, res) => {
    const {userId} = req.params
    const {containerName} = req.body
  
    try {
      //Find User
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({message:'user not found'})
      }
  
      //Make Container
      const container = new Container({
        name:containerName,
        user:userId
  
      })
  
      //Save Container:
      await container.save()
  
      //Add Container To User's Containers:
      user.containers.push(container._id)
      await user.save()
  
      return res.status(201).json({message:"container created successfully"})
  
    }catch(err){
      console.log(err)
      return res.status(500).json({message:"error accrued while created Container"})
    }
  })


export default router;
import express from "express";
import User from "../models/user.js";
import List from "../models/list.js";
import Container from "../models/container.js";

const router = express.Router();

// Create New List:
// - [ 1 ] Check if user is the owner of the container
// - [ 2 ] Create New List Instance
// - [2-1]  Find the Container, that the list will be attached to
// - [ 3 ] Push it in to the container
router.post("/list/:userId", async (req, res) => {
  const {userId} = req.params
  const {name, containerId} = req.body
    try {
      const newList = new List({
        name:
        container: 
      })
    }

})



//Edit the list's name of a container or change the connected container for a list
// - [ 1 ] Find the list by ID
// - [ 2 ] Check if user is the owner of the list's container:
// - [ 3 ] Update list name if it is provided
// - [ 4 ] Change The connected container if is Provided and Differ from Old one:
// - [ 4-1 ] Find the new container
// - [ 4-2 ] Remove the list from the old container
// - [ 4-3 ] Add the list to the new container
// - [ 4-4 ] Update the list's container reference
//-  [ 5 ] Save Updated List
router.put("/list/:userId/:listId", async (req, res) => {
  const { userId, listId } = req.params;
  const { name, containerId } = req.body;
  try {
    //[1]Find The List By Id:
    const list = await List.findById(listId).populate("container");
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    //[2] Check if user is the owner of the list's container:
    if (list.container.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this list" });
    }

    //[3] Update the list name if it is provided
    if (name) {
      list.name = name;
    }

    // - [ 4 ] Change The connected container if is Provided and Differ from Old one:
    if (containerId && containerId !== list.container._id.toString()) {
      //[ 4-1 ]Find New Container:
      const newContainer = await Container.findById(containerId);
      if (!newContainer) {
        return res.status(404).json({ message: "Container not found" });
      }
      //[ 4-2 ]Remove the list from the old container:
      const oldContainer = await Container.findById(list.container._id);
      if (oldContainer) {
        oldContainer.lists.pull(list._id);
        await oldContainer.save();
      }

      // - [ 4-3 ] Add the list to the new container:
      newContainer.lists.push(list._id);
      await newContainer.save();

      // - [ 4-4 ] Update the list's container reference:
      list.container = containerId;
    }

    //Save Updated List:
    await list.save();
    res.status(200).json({ message: "List updated successfully", list });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



//Getting All Containers Of User:
// router.get("/:userId/:containerId", async (req, res) => {
//   const { userId, containerId } = req.params;
//   console.log(userId);
//   try {
//     const userContainer = await Container.findOne();

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     res.status(200).json(user.containers);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// });
export default router;

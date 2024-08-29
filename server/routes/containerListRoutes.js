//Create a New Container:
app.post('/new-container/:userId', async (req, res) => {
    const {userId} = req.params
    const {container_name, } = req.body
  
    try {
      //Find User
      const user = await User.findById(userId)
      if (!user) {
        return res.status(404).json({message:'user not found'})
      }
  
      //Make Container
      const container = new Container({
        name:container_name,
        user:userId
  
      })
  
      //Save Container:
      await Container.save()
  
      //Add Container To User's Containers:
      user.container.push(container._id)
      await user.save()
  
      return res.status(201).json({message:"container created successfully"})
  
    }catch(err){
      return res.status(500).json({message:"error accrued while created Container"})
    }
  })
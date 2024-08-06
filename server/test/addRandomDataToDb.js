

async function createRandomUser() {
    const user = new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password() // Remember to hash this in a real application
    });
    await user.save();
    return user;
  }
  
async function createRandomTask(userId) {
    const task = new Task({
      title: faker.lorem.words(),
      description: faker.lorem.sentence(),
      dueDate: faker.date.future(),
      priority: faker.random.arrayElement(['Low', 'Medium', 'High']),
      status: faker.random.arrayElement(['Pending', 'In Progress', 'Completed']),
      user: userId
    });
    
    await task.save();
  
    const user = await User.findById(userId);
    user.tasks.push(task._id);
    await user.save();
  
    return task;
  }
  
  async function populateDatabase() {

    const user = await createRandomUser();
    console.log('Created user:', user);
  

    const task = await createRandomTask(user._id);
    console.log('Created task for user:', task);

    }
    mongoose.connection.close();

populateDatabase().catch(err => console.error(err));
  

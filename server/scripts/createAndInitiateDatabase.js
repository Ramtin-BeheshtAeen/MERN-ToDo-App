import mongoose from 'mongoose';
import Task from './task.js';
import List from './list.js';
import Container from './container.js';
import User from './user.js';

const initializeDatabase = async () => {
  try {
    await mongoose.connect('mongodb://172.22.240.1:27017/to_do_app', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if the collections are empty and insert initial data if necessary
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      const user = new User({
        name: 'J',
        lastName: 'D',
        email: 't@t.com',
        password: 'password123',
      });
      await user.save();

      const container = new Container({
        name: 'Default Container',
        user: user._id,
      });
      await container.save();

      const list = new List({
        name: 'Default List',
        container: container._id,
      });
      await list.save();

      const task = new Task({
        title: 'Default Task',
        dueDate: new Date(),
        dueTime: '12:00',
        user: user._id,
        list: list._id,
      });
      await task.save();

      // Update references
      user.containers.push(container._id);
      await user.save();

      container.lists.push(list._id);
      await container.save();

      list.tasks.push(task._id);
      await list.save();
    }

    console.log('Database initialized successfully');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
};

initializeDatabase();

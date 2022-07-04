const express = require('express');
const chalk = require('chalk');
const mongoose = require('mongoose');

//` Setting up the environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

// ! Note: The below code is not required for the project to work
global.__ = console.log;
global._ = (parameter) => {
  console.log(chalk.green.bgYellow(parameter));
};
global._e = (parameter) => {
  console.log(chalk.red.bgRed(parameter));
};

const { PORT, DATABASE } = process.env;

mongoose.connect(DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('open', () => {
  _('Connected to MongoDB');
});

mongoose.connection.on('error', () => {
  _e('Not connected to MongoDB');
});

// # DATABASE SCHEMA

const todo = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const todoModel = mongoose.model('todo', todo);

// # ----------------------

const app = express();

app.use(express.json());

app.post('/add_todo', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const newTodo = await todoModel.create({
      title,
      description,
      completed,
    });

    res.status(201).json({
      status: 'success',
      message: 'Todo added successfully',
      data: newTodo,
    });
  } catch (e) {
    res.status(400).json({
      status: 'error',
      message: 'Todo not added',
      data: e.message,
    });
  }

  // const newTodo = new todoModel({
  //   title,
  //   description,
  // });

  // __(newTodo);

  // await newTodo.save();

  // todoModel
  //   .create({
  //     title,
  //     description,
  //   })
  //   .then((newTodo) => {
  //     res.status(201).json({
  //       status: 'success',
  //       message: 'Todo added successfully',
  //       data: newTodo,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).json({
  //       status: 'error',
  //       message: 'Todo not added',
  //       data: err,
  //     });
  //   });
});

app.get('/', async (req, res) => {
  const todo = await todoModel.find();
  res.status(200).json(todo);
});

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});

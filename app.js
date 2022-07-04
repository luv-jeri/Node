const express = require('express');
const chalk = require('chalk');
const Todo = require('./database/Schemas/Todo.schema');

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

require('./database/connection');

const app = express();

app.use(express.json());

app.post('/add_todo', async (req, res) => {
  const { title, description, completed } = req.body;

  try {
    const newTodo = await Todo.create({
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
});

app.get('/', async (req, res) => {
  const todo = await Todo.find();
  res.status(200).json(todo);
});

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});

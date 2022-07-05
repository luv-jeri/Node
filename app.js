const express = require('express');
const chalk = require('chalk');
const Todo = require('./database/Schemas/Todo.schema');

//` Setting up the environment variables
const dotenv = require('dotenv');
dotenv.config({
  path: './config.env',
});

require('./database/connection');

// ! Note: The below code is not required for the project to work
global.__ = console.log;
global._ = (parameter) => {
  console.log(chalk.green.bgYellow(parameter));
};
global._e = (parameter) => {
  console.log(chalk.red.bgRed(parameter));
};

const { PORT } = process.env;

const app = express();
// Create a body parse function
app.use(express.json());

app.use((req, res, next) => {
  if (req.headers.key == 1234) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.get('/', (req, res) => {
  _('HELLO ');
  _(req.headers.time);
  res.send('OK');
});

app.get('/hello', (req, res) => {
  _('HELLO ');
  res.send('hello');
});

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});

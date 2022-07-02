const express = require('express');
const chalk = require('chalk');
const fs = require('fs');

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

const { PORT } = process.env;

const app = express();

app.use(express.json());

// #Creating a server

app.get('/', (req, res) => {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      _e('SOME ERROR OCCURRED');
      __(err);
      res.status(500).json({ message: 'SOME ERROR OCCURRED' });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: JSON.parse(data),
    });
  });

  // const data = fs.readFileSync('./database.json', 'utf8');

  // res.status(200).json({
  //   status: 'success',
  //   data: JSON.parse(data),
  // });
});

app.post('/', (req, res) => {
  fs.readFile('./database.json', 'utf8', (err, data) => {
    if (err) {
      _e('SOME ERROR OCCURRED');
      __(err);
      res.status(500).json({ message: 'SOME ERROR OCCURRED' });
      return;
    }

    const { name, release } = req.body;

    const _data = JSON.parse(data);

    if (!release) {
      _e('Release is required');
      res.status(400).json({ message: 'Release  Date is required' });
      return;
    }

    const duplicate = _data.find((el) => {
      if (el.name === name) {
        return true;
      }
    });

    if (duplicate) {
      res.status(400).json({
        status: 'fail',
        message: 'Duplicate entry',
      });
      return;
    }

    _data.push({
      name,
      release,
    });

    fs.writeFile('./database.json', JSON.stringify(_data), (err) => {
      if (err) {
        _e('SOME ERROR OCCURRED');
        __(err);
        res.status(500).json({ message: 'SOME ERROR OCCURRED' });
        return;
      }

      res.status(201).json({ message: 'DATA CREATED' });
    });
  });

  // const dataJSON = fs.readFileSync('./database.json', 'utf8');

  // const parsedData = JSON.parse(dataJSON);
  // parsedData.push(req.body);

  // fs.writeFileSync('./database.json', JSON.stringify(parsedData));

  // res.status(201).json({
  //   message: 'Your data has been added successfully',
  // });
});

app.listen(PORT, () => {
  _(`Server is running on port ${PORT}`);
});

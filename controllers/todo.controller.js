const Todo = require('../database/Schemas/Todo.schema');

module.exports.addTodo = async (req, res) => {
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
};

module.exports.getTodo = async (req, res) => {
  const todo = await Todo.find();
  res.status(200).json(todo);
};

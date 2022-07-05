const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 255,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  },
});

const Todo = model('todo', todoSchema);

module.exports = Todo;

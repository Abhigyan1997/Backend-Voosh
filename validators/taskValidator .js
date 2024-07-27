const { body } = require('express-validator');

// Validator for creating a task
const createTaskValidator = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
];

// Validator for updating a task
const updateTaskValidator = [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('description').optional().notEmpty().withMessage('Description cannot be empty'),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator
};

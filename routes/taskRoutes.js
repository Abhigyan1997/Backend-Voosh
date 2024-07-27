const express = require('express');
const { validationResult } = require('express-validator');
const authenticate = require('../middleware/auth'); // Ensure path is correct
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController'); // Ensure path is correct

// Import your custom validators
const { createTaskValidator, updateTaskValidator } = require('../validators/taskValidator '); // Ensure path is correct

const router = express.Router();

// Middleware to handle validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Route to get tasks
router.get('/tasks', authenticate, getTasks);

// Route to create a new task
router.post('/tasks', [
  createTaskValidator,
  validate
], authenticate, createTask);

// Route to update a task
router.put('/tasks/:id', [
  updateTaskValidator,
  validate
], authenticate, updateTask);

// Route to delete a task
router.delete('/tasks/:id', authenticate, deleteTask);

module.exports = router;

const Task = require('../models/taskModel'); // Adjust path as needed
const { validationResult } = require('express-validator');

const moment = require('moment-timezone');

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const createdAt = moment().tz('Asia/Kolkata').format(); // Get current time in IST

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.user || !req.user.id) {
      throw new Error('User ID is missing');
    }

    const task = await Task.create({ title, description, status, userId: req.user.id, createdAt });
    res.status(201).json(task);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Server error' });
  }
};


exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.updateTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    const { id } = req.params;
    const { title, description, status } = req.body; // Use `status` here
  
    try {
      const task = await Task.findOne({ _id: id, userId: req.user.id });
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
  
      task.title = title || task.title; // Allow partial updates
      task.description = description || task.description;
      task.status = status || task.status; // Update the status field
      await task.save();
  
      res.json(task);
    } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  

exports.deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOne({ _id: id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.deleteOne();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

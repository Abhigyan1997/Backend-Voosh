const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['TODO', 'IN PROGRESS', 'DONE'], default: 'TODO' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
  });
  

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

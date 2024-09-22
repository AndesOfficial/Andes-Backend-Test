import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title : {
    type: 'string',
    required: [true, 'title is required'],
    
  },
  description: {
    type:'string',
    required: true,
  },
  completed: {
    type: 'boolean',
    default: false,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  dueDate: {
    type: Date,
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;
const mongoose = require('mongoose');

/**
 * Task Schema - Defines the structure of task documents
 */

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Task title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        description: {
            type: String,
            trim: true,
            maxlength: [500, 'Description cannot exceed 500 characters']
        },

        status: {
            type: String,
            enum: {
                values: ['todo', 'in-progress', 'done'],
                message: '{VALUE} is not a valid status. Use: todo, in-progress, or done'
            },
            default: 'todo'
        },

        priority: {
            type: String,
            enum: {
                values: ['low', 'medium', 'high'],
                message: '{VALUE} is not a valid priority. Use: low, medium, or high'
            },
            default: 'medium'
        },

        dueDate: {
            type: Date
        },

        // Reference to the user who created this task
        // This links the task to a user in the User collection
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'Task must belong to a user']
        }
    },
    {
        timestamps: true
    }
);

    /**
     * Index for faster queries
     * This helps MongoDB find tasks by user quickly
     */
    taskSchema.index({ createdBy: 1, createdAt: -1 });

// Create and export the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;

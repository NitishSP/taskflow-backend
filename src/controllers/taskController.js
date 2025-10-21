const Task = require('../models/Task');

/**
 * Task Controller
 */

/**
 * @route   POST /api/v1/tasks - private
 */
exports.createTask = async (req, res) => {
    try {
        // Extract task details from request body
        const { title, description, status, priority, dueDate } = req.body;

        // Validate required field
        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a task title'
            });
        }

        // Create new task
        const task = await Task.create({
            title,
            description,
            status,
            priority,
            dueDate,
            createdBy: req.user.id
        });

        // Send success response
        res.status(201).json({
            success: true,
            message: 'Task created successfully',
            data: {
                task
            }
        });

    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while creating task',
            error: error.message
        });
    }
};

/**
 * @route   GET /api/v1/tasks - private
 */
exports.getTasks = async (req, res) => {
    try {
        // Find all tasks created by the authenticated user - Sort by creation date (newest first)
        const tasks = await Task.find({ createdBy: req.user.id })
            .sort({ createdAt: -1 });

        // Send response with tasks
        res.status(200).json({
            success: true,
            count: tasks.length,
            data: {
                tasks
            }
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while fetching tasks',
            error: error.message
        });
    }
};

/**
 * @route   GET /api/v1/tasks/:id - private
 */
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find task by ID and ensure it belongs to the authenticated user
        const task = await Task.findOne({
            _id: id,
            createdBy: req.user.id
        });

        // Check if task exists
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            data: {
                task
            }
        });

    } catch (error) {
        console.error('Get task by ID error:', error);

        // Handle invalid MongoDB ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while fetching task',
            error: error.message
        });
    }
};

/**
 * @route   PUT /api/v1/tasks/:id - Private
 */
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority, dueDate } = req.body;

        // Find task by ID and ensure it belongs to the authenticated user
        let task = await Task.findOne({
            _id: id,
            createdBy: req.user.id
        });

        // Check if task exists
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Update task fields (only update fields that are provided)
        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (status !== undefined) task.status = status;
        if (priority !== undefined) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;

        // Save updated task
        await task.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: {
                task
            }
        });

    } catch (error) {
        console.error('Update task error:', error);

        // Handle invalid MongoDB ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while updating task',
            error: error.message
        });
    }
};

/**
 * @route   DELETE /api/v1/tasks/:id -  Private
 */
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete task (only if it belongs to the authenticated user)
        const task = await Task.findOneAndDelete({
            _id: id,    
            createdBy: req.user.id
        });

        // Check if task exists
        if (!task) {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: 'Task deleted successfully',
            data: {
                task
            }
        });

    } catch (error) {
        console.error('Delete task error:', error);

        // Handle invalid MongoDB ObjectId format
        if (error.kind === 'ObjectId') {
            return res.status(404).json({
                success: false,
                message: 'Task not found'
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error while deleting task',
            error: error.message
        });
    }
};

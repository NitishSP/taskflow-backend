const express = require('express');
const router = express.Router();
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middlewares/authMiddleware');


router.use(protect);

/**
 * @route   POST /api/v1/tasks - Private
 */
router.post('/', createTask);

/**
 * @route   GET /api/v1/tasks - Private
 */
router.get('/', getTasks);

/**
 * @route   GET /api/v1/tasks/:id - Private
 */
router.get('/:id', getTaskById);

/**
 * @route   PUT /api/v1/tasks/:id - Private
 */
router.put('/:id', updateTask);

/**
 * @route   DELETE /api/v1/tasks/:id - Private
 */
router.delete('/:id', deleteTask);

module.exports = router;
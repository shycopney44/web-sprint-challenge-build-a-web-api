const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model');
const router = express.Router();

// Middleware for validation
const validateActionId = async (req, res, next) => {
  try {
    const action = await Actions.get(req.params.id);
    if (action) {
      req.action = action;
      next();
    } else {
      res.status(404).json({ message: 'Action not found' });
    }
  } catch (err) {
    next(err); // Pass error to the error-handling middleware
  }
};

const validateActionBody = async (req, res, next) => {
  const { project_id, description, notes } = req.body;
  if (!project_id || !description || !notes) {
    res.status(400).json({ message: 'Missing required fields: project_id, description, and notes' });
  } else {
    try {
      const project = await Projects.get(project_id);
      if (project) {
        next();
      } else {
        res.status(400).json({ message: 'Invalid project_id. Project does not exist.' });
      }
    } catch (err) {
      next(err);
    }
  }
};

// Endpoints
router.get('/', async (req, res, next) => {
  try {
    const actions = await Actions.get();
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post('/', validateActionBody, async (req, res, next) => {
  try {
    const newAction = await Actions.insert(req.body);
    res.status(201).json(newAction);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateActionId, validateActionBody, async (req, res, next) => {
  try {
    const updatedAction = await Actions.update(req.params.id, req.body);
    res.status(200).json(updatedAction);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', validateActionId, async (req, res, next) => {
  try {
    await Actions.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

// Error-handling middleware
router.use((err, req, res, next) => {
  res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

module.exports = router;

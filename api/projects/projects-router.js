const express = require('express');
const Projects = require('./projects-model');
const { validateProjectId, validateProjectBody } = require('./projects-middleware');
const router = express.Router();

// Endpoints
router.get('/', async (req, res, next) => {
  try {
    const projects = await Projects.get();
    res.status(200).json(projects);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.post('/', validateProjectBody, async (req, res, next) => {
  try {
    const newProject = await Projects.insert(req.body);
    res.status(201).json(newProject);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', validateProjectId, validateProjectBody, async (req, res, next) => {
  try {
    const updatedProject = await Projects.update(req.params.id, req.body);
    res.status(200).json(updatedProject); // Respond with the updated project
  } catch (err) {
    next(err); // Pass errors to error-handling middleware
  }
});


router.delete('/:id', validateProjectId, async (req, res, next) => {
  try {
    await Projects.remove(req.params.id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.get('/:id/actions', validateProjectId, async (req, res, next) => {
  try {
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
  } catch (err) {
    next(err);
  }
});

// Error-handling middleware
router.use((err, req, res, next) => {
  res.status(500).json({ message: 'An internal server error occurred', error: err.message });
});

module.exports = router;

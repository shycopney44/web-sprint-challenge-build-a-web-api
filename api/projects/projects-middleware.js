const Projects = require('./projects-model');

async function validateProjectId(req, res, next) {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next();
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error validating project ID' });
  }
}

function validateProjectBody(req, res, next) {
  const { name, description, completed } = req.body;
  if (!name || !description || completed === undefined) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  next();
}

module.exports = { validateProjectId, validateProjectBody };

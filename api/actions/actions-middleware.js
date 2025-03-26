const Projects = require('../projects/projects-model');

async function validateActionBody(req, res, next) {
  const { project_id, description, notes, completed } = req.body;

  if (!project_id || !description || !notes) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (description.length > 128) {
    return res.status(400).json({ message: 'Description too long' });
  }
  try {
    const project = await Projects.get(project_id);
    if (!project) {
      return res.status(400).json({ message: 'Invalid project_id' });
    }
    next();
  } catch (err) {
    res.status(500).json({ message: 'Error validating action body' });
  }
}

module.exports = { validateActionBody };

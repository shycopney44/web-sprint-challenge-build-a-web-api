const Projects = require('./projects-model'); // Helper model for database operations

// Middleware: Validate Project ID
const validateProjectId = async (req, res, next) => {
  try {
    const project = await Projects.get(req.params.id);
    if (project) {
      req.project = project;
      next(); // Proceed to the next middleware/handler
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    next(err); // Pass error to the error-handling middleware
  }
};

// Middleware: Validate Project Body
const validateProjectBody = (req, res, next) => {
  const { name, description, completed } = req.body;

  // Check for missing required fields
  if (!name || !description || completed === undefined) {
    return res.status(400).json({
      message: 'Missing required fields: name, description, or completed',
    });
  }

  next(); // Proceed if all fields are present
};


// Export middleware functions
module.exports = {
  validateProjectId,
  validateProjectBody,
};

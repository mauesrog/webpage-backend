import projects from '../models/project_model';

export const fetchProjects = (req, res) => {
  try {
    res.json({ projects });
  } catch (err) {
    res.json({ error: `${err}` });
  }
};

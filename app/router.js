import { Router } from 'express';
import * as Projects from './controllers/project_controller';
import * as Email from './controllers/email_controller';
import * as Drive from './controllers/drive_controller';
import { requireAuthGoogle } from './services/passport';

const router = Router();

router.route('/projects')
      .get(Projects.fetchProjects);

router.route('/contact')
      .post(Email.sendEmail);

router.route('/drive')
      .get(requireAuthGoogle, Drive.getResumeUrl)
      .put(requireAuthGoogle, Drive.updateResume);

export default router;

import { Router } from 'express';
import * as Projects from './controllers/project_controller';
import * as Email from './controllers/email_controller';


const router = Router();

router.route('/projects')
      .get(Projects.fetchProjects);

router.route('/contact')
      .post(Email.sendEmail);

export default router;

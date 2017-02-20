import { Router } from 'express';
import * as Projects from './controllers/project_controller';
import * as Email from './controllers/email_controller';
<<<<<<< HEAD
import * as Drive from './controllers/drive_controller';
=======
>>>>>>> efede5aaf8ac8558b0338396b47de4f6454dc51b


const router = Router();

router.route('/projects')
      .get(Projects.fetchProjects);

router.route('/contact')
      .post(Email.sendEmail);

<<<<<<< HEAD
router.route('/drive')
      .get(Drive.getResumeUrl)
      .put(Drive.updateResume);

=======
>>>>>>> efede5aaf8ac8558b0338396b47de4f6454dc51b
export default router;

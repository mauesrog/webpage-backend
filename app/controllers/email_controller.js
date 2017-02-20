import sendgrid from 'sendgrid';
import config from '../config';

const helper = sendgrid.mail;

const sg = require('sendgrid')(config.sendgrid.secret);

export const sendEmail = (req, res) => {
  try {
    const fromEmail = new helper.Email('mauricio.esquivel.rogel.18@dartmouth.edu');
    const toEmail = new helper.Email('mauricio.esquivel.rogel.18@dartmouth.edu');
    const subject = 'Activity in Website';
    const content = new helper.Content('text/plain', `Hola Mau, ${req.body.name} de correo ${req.body.email} te mandó el siguiente mensaje:\n\n\"${req.body.content}\"`);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

    console.log(req);

    const request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, (error, response) => {
      try {
        if (error) {
          console.log('why');
          res.json({ error: `${error}` });
        } else {
          console.log('hahaha');
          console.log(`Hola Mau, ${req.body.name} de correo ${req.body.email} te mandó el siguiente mensaje:\n\n\"${req.body.content}\"`);

          res.json({ message: 'Thank you, I will contact you shortly.' });
        }
      } catch (err) {
        res.json({ error: `${err}` });
      }
    });
  } catch (err) {
    res.json({ error: `${err}` });
  }
};

import sendgrid from 'sendgrid';
import config from '../config';

const helper = sendgrid.mail;

const sg = require('sendgrid')(config.sendgridSecret);

export const sendEmail = (req, res) => {
  try {
    const fromEmail = new helper.Email('mauricio.esquivel.rogel.18@dartmouth.edu');
    const toEmail = new helper.Email('maurirogel@yahoo.com.mx');
    const subject = 'Activity in Website';
    const content = new helper.Content('text/plain', `Hola Mau, ${req.name} de correo ${req.email} te mandó el siguiente mensaje:\n\n\"${req.message}\"`);
    const mail = new helper.Mail(fromEmail, subject, toEmail, content);

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
          console.log(response.statusCode);
          console.log(response.body);
          console.log(response.headers);

          res.json({ message: 'Email verification sent' });
        }
      } catch (err) {
        res.json({ error: `${err}` });
      }
    });
  } catch (err) {
    res.json({ error: `${err}` });
  }
};

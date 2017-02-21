import CustomStrategy from 'passport-custom';
import google from 'googleapis';
import passport from 'passport';
import fs from 'fs';

const scopes = ['https://www.googleapis.com/auth/drive'];

let config = fs.readFileSync('app/computeService.json');

if (config === null) throw new EvalError('Missing file');

config = JSON.parse(config);

const clientEmail = config.client_email;
const privateKey = config.private_key;

const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, scopes);

const jwtLoginGoogle = new CustomStrategy((req, done) => {
  try {
    jwtClient.authorize((err, token) => {
      try {
        if (err) done(`Unauthorized: ${err}`);
        else done(null, jwtClient);
      } catch (error) {
        done(`Unauthorized: ${error}`);
      }
    });
  } catch (err) {
    if (err) done(`Unauthorized: ${err}`);
  }
});

passport.use('googleAuth', jwtLoginGoogle);

export const requireAuthGoogle = passport.authenticate('googleAuth', { session: false });

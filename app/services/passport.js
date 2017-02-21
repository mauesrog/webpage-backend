import CustomStrategy from 'passport-custom';
import google from 'googleapis';
import config from '../config';
import passport from 'passport';
import fs from 'fs';

const clientEmail = config.googleClientEmail;
const privateKey = config.googlePrivateKey;
const scopes = ['https://www.googleapis.com/auth/drive'];

let config2 = fs.readFileSync('app/computeService.json');

if (config2 !== null) {
  config2 = JSON.parse(config2);
}

const jwtClient = new google.auth.JWT(config2.client_email, null, config2.private_key, scopes);

const jwtLoginGoogle = new CustomStrategy((req, done) => {
  try {
    jwtClient.authorize((err, token) => {
      try {
        console.log(config2.private_key, privateKey);
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

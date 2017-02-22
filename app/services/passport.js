import CustomStrategy from 'passport-custom';
import google from 'googleapis';
import passport from 'passport';
import config from '../config';

const scopes = ['https://www.googleapis.com/auth/drive'];

const clientEmail = config.googleClientEmail;
const privateKey = config.googlePrivateKey.replace(/\\\n/g, '\n')
.replace(/(.*).$/, '$1');

console.log(privateKey);

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

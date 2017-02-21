import CustomStrategy from 'passport-custom';
import google from 'googleapis';
import config from '../config';
import passport from 'passport';

const clientEmail = config.googleClientEmail;
const privateKey = config.googlePrivateKey;
const scopes = ['https://www.googleapis.com/auth/drive'];

const jwtClient = new google.auth.JWT(clientEmail, null, privateKey, scopes);

const jwtLoginGoogle = new CustomStrategy((req, done) => {
  try {
    jwtClient.authorize((err, token) => {
      try {
        console.log(clientEmail, privateKey, config);
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

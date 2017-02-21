import dotenv from 'dotenv';

dotenv.config();

export default {
  googleApiKey: process.env.GOOGLE_API_KEY,
  googleClientEmail: process.env.GOOGLE_CLIENT_EMAIL,
  googlePrivateKey: process.env.GOOGLE_CLIENT_PRIVATE_KEY,
  sendgridSecret: process.env.SENDGRID_API_KEY,
};

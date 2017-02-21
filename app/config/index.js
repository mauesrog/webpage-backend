import dotenv from 'dotenv';

dotenv.config();

export default {
  fixie: {
    url: process.env.FIXIE_URL,
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY,
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL,
    privateKey: process.env.GOOGLE_CLIENT_PRIVATE_KEY,
  },
  sendgrid: {
    secret: process.env.SENDGRID_API_KEY,
  },
};

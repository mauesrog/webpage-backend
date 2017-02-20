import dotenv from 'dotenv';

dotenv.config();

export default {
  sendgrid: {
    secret: process.env.API_SECRET,
    sendgridSecret: process.env.SENDGRID_API_KEY,
  },
  google: {
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientId: process.env.GOOGLE_CLIENT_ID,
    redirectUrl: process.env.GOOGLE_REDIRECT_URL,
    accessToken: process.env.GOOGLE_ACCESS_TOKEN,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
    tokenType: process.env.GOOGLE_TOKEN_TYPE,
    expiryDate: parseInt(process.env.GOOGLE_EXPIRY_DATE, 10),
  },
};

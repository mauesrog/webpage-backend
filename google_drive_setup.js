import fs from 'fs';
import readline from 'readline';
import googleAuth from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_DIR = `${(process.env.HOME || process.env.HOMEPATH ||
  process.env.USERPROFILE)}/.credentials/`;
const TOKEN_PATH = `${TOKEN_DIR}drive-nodejs-quickstart.json`;
const authObj = {};

// Load client secrets from a local file.
fs.readFile('client_secret.json', (err, content) => {
  if (err) {
    console.log(`Error loading client secret file: ${err}`);
    return;
  }
  // Authorize a client with the loaded credentials, then call the
  // Drive API.
  authorize(JSON.parse(content)).then(auth => { authObj.auth = auth; });
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 *
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials) {
  return new Promise((resolve, revoke) => {
    try {
      const clientSecret = credentials.installed.client_secret;
      const clientId = credentials.installed.client_id;
      const redirectUrl = credentials.installed.redirect_uris[0];
      const auth = new googleAuth();
      const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

      if (process.env.GOOGLE_ACCESS_TOKEN) {
        oauth2Client.credentials = {
          access_token: process.env.GOOGLE_ACCESS_TOKEN,
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
          token_type: process.env.GOOGLE_TOKEN_TYPE,
          expiry_date: parseInt(process.env.GOOGLE_EXPIRY_DATE, 10),
        };

        resolve(oauth2Client);
      } else {
        console.log('error');
        getNewToken(oauth2Client).then(oAuth => { resolve(oAuth); });
      }
    } catch (error) {
      revoke(error);
    }
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 *
 * @param {google.auth.OAuth2} oauth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback to call with the authorized
 *     client.
 */
function getNewToken(oauth2Client) {
  return new Promise((resolve, revoke) => {
    try {
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
      });
      console.log('Authorize this app by visiting this url: ', authUrl);
      const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      rl.question('Enter the code from that page here: ', code => {
        rl.close();
        oauth2Client.getToken(code, (err, token) => {
          if (err) {
            console.log('Error while trying to retrieve access token');
            revoke(err);
          }

          const hi = oauth2Client;

          hi.credentials = token;
          storeToken(token);
          resolve(oauth2Client);
        });
      });
    } catch (error) {
      revoke(error);
    }
  });
}

/**
 * Store token to disk be used in later program executions.
 *
 * @param {Object} token The token to store to disk.
 */
function storeToken(token) {
  try {
    fs.mkdirSync(TOKEN_DIR);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }
  fs.writeFile(TOKEN_PATH, JSON.stringify(token));
  console.log(`Token stored to ${TOKEN_PATH}`);
}

export default authObj;

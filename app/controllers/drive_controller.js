import google from 'googleapis';
import authObj from '../../google_drive_setup';
import fs from 'fs';

const drive = google.drive('v3');

const listFiles = () => {
  return new Promise((resolve, revoke) => {
    try {
      const auth = authObj.auth;
      drive.files.list({
        auth,
        pageSize: 10,
        fields: 'nextPageToken, files(id, name, webViewLink)',
      }, (err, response) => {
        if (err) {
          revoke(`The API returned an error: ${err}`);
          return;
        }

        const files = response.files;
        if (files.length === 0) {
          revoke('No files found.');
        } else {
          resolve(files);
        }
      });
    } catch (error) {
      revoke(error);
    }
  });
};

export const getResumeUrl = (req, res) => {
  try {
    listFiles().then(files => {
      try {
        let resume = null;
        let i = 0;

        while (resume === null && i < files.length) {
          if (files[i].name === 'CV Final.pdf') {
            resume = files[i];
            i++;
          }
        }

        if (resume === null) {
          res.json({ error: 'CV File not found on Google Drive.' });
          return;
        }

        res.json({ url: resume.webViewLink.replace(/\?usp=drivesdk/, '') });
      } catch (error) {
        res.json({ error: `${error}` });
      }
    })
    .catch(err => { res.json({ error: `${err}` }); });
  } catch (error) {
    res.json({ error: `${error}` });
  }
};

export const updateResume = (req, res) => {
  try {
    const RESUME_METADATA = { name: 'CV Final.pdf', mimeType: 'application/pdf' };
    let RESUME_MEDIA;

    if (process.env.OFFLINE) {
      RESUME_MEDIA = {
        body: fs.createReadStream('/Users/maurirogel/Documents/Dartmouth/CV Final.pdf'),
      };
    }

    listFiles().then(files => {
      try {
        const auth = authObj.auth;
        let fileId = null;
        let i = 0;

        while (fileId === null && i < files.length) {
          if (files[i].name === 'CV Final.pdf') {
            fileId = files[i].id;
            i++;
          }
        }

        if (fileId === null) {
          res.json({ error: 'CV File not found on Google Drive.' });
          return;
        }
        drive.files.delete({ auth, fileId }, (err3) => {
          try {
            if (err3) res.json({ error: `${err3}` });
            drive.files.create({ auth, resource: RESUME_METADATA, media: RESUME_MEDIA }, (err, file) => {
              try {
                if (err) res.json({ error: `${err}` });
                else {
                  const resource = {
                    value: null,
                    type: 'anyone',
                    role: 'reader',
                    withLink: true,
                  };

                  drive.permissions.create({ fileId: file.id, resource, auth }, (err1) => {
                    if (err1) res.json({ error: `${err1}` });
                    else {
                      console.log(file);
                      res.json({ msg: `Successfully updated resume ${file.name} with id ${file.id}` });
                    }
                  });
                }
              } catch (error) {
                res.json({ error: `${error}` });
              }
            });
          } catch (error) {
            res.json({ error: `${error}` });
          }
        });
      } catch (error) {
        res.json({ error: `${error}` });
      }
    })
    .catch(err => { res.json({ error: `${err}` }); });
  } catch (error) {
    res.json({ error: `${error}` });
  }
};

const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Load service account key
const keyFilePath = path.join(__dirname, 'praxis-gasket-430915-a0-f8be0ba0733f.json');
const auth = new google.auth.GoogleAuth({
  keyFile: keyFilePath,
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

const spreadsheetId = '1DcRt3SCbFq13XajTMNAv4hbp63TPGeRAvN1Q19mwd6I'; // Replace with your Google Sheet ID

app.post('/api/login', async (req, res) => {
  const { email } = req.body;
  
  try {
    // Append the email to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:A', // Adjust range if necessary
      valueInputOption: 'RAW',
      resource: {
        values: [[email]],
      },
    });

    res.status(200).send('Email logged in Google sheet successfully.');
  } catch (error) {
    console.error('Error logging email:', error);
    res.status(500).send('Error logging email.');
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});

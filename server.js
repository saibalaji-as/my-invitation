const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/api/record-viewer', (req, res) => {
  const { name } = req.body;
  const entry = `${new Date().toISOString()} - ${name}\n`;
  fs.appendFile('responses.txt', entry, err => {
    if (err) {
      console.error('Error saving response:', err);
      return res.status(500).send('Failed to record viewer');
    }
    res.send('Viewer recorded');
  });
});

app.get('/responses', (req, res) => {
  fs.readFile('responses.txt', 'utf8', (err, data) => {
    if (err) return res.status(500).send('Unable to load responses');
    res.type('text').send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

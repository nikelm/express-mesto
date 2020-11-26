const express = require('express');
const fs = require('fs');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(`${__dirname}/public`));

app.get('/users', (req, res) => {
  fs.readFile('user.json', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.type('json').send(data);
  });
});

app.get('/cards', (req, res) => {
  fs.readFile('cards.json', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.type('json').send(data);
  });
});

app.get('/users/:id', (req, res) => {
  fs.readFile('user.json', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(data);
    res.type('json').send(req.params.id);
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

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
    const users = JSON.parse(data);
    const user = users.find((myUser) => myUser._id === req.params.id);
    if (user) {
      res.send(user);
    } else {
      const message = { message: 'Нет пользователя с таким id' };
      res.status(404).type('json').send(message);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

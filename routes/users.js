const usersRouter = require('express').Router();
const fs = require('fs');

usersRouter.get('/users', (req, res) => {
  fs.readFile('./data/user.json', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.type('json').send(data);
  });
});

module.exports = usersRouter;

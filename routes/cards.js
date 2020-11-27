const cardsRouter = require('express').Router();
const fs = require('fs');

cardsRouter.get('/users', (req, res) => {
  fs.readFile('./data/cards.json', { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    res.type('json').send(data);
  });
});

module.exports = cardsRouter;

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.user = {
    // _id: '5fd63a479a8b2d19883573f0',
    _id: '5fd6f8c1af9d7f4d1926f707',
  };

  next();
});

app.use('/', cardsRouter);
app.use('/', usersRouter);
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

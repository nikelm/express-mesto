const express = require('express');
// const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const otherRouter = require('./routes/other');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const createCardRouter = require('./routes/cards');
const deleteCardRouter = require('./routes/cards');
const createUserRouter = require('./routes/users');
const updateUserRouter = require('./routes/users');
const updateAvatarRouter = require('./routes/users');
const likeCardRouter = require('./routes/cards');
const dislikeCardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const app = express();

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  req.user = {
    _id: '5fd4a42ca44561020ca38dba',
  };

  next();
});

app.use('/cards', cardsRouter);
app.use('/cards', createCardRouter);
app.use('/cards', deleteCardRouter);
app.use('/cards', likeCardRouter);
app.use('/cards', dislikeCardRouter);
app.use('/users', usersRouter);
app.use('/users', createUserRouter);
app.use('/users/me', updateUserRouter);
app.use('/', updateAvatarRouter);
app.use('/*', otherRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

const express = require('express');
const path = require('path');
const otherRouter = require('./routes/other');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/cards', cardsRouter);
app.use('/users', usersRouter);
app.use('/*', otherRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

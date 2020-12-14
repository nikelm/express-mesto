const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err, { message: 'На сервере произошла ошибка' }));

const getProfile = (req, res) => User.findById(req.params.id)
  .then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(200).send(user);
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      return res.status(404).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });

const createUser = (req, res) => User.create(req.body)
  .then((users) => res.status(200).send(users))
  .catch((err) => {
    if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
      return res.status(400).send({ message: 'Вы указали некорректные данные' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { name: req.body.name, about: req.body.about }, {
    new: true,
    runValidators: true,
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        return res.status(400).send({ message: 'Вы указали некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id, { avatar: req.body.avatar }, {
    new: true,
    runValidators: true,
  })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        return res.status(400).send({ message: 'Вы указали некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
};

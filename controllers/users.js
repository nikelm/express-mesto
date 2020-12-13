const User = require('../models/user');

const getUsers = (req, res) => User.find({})
  .then((users) => res.status(200).send(users))
  .catch((err) => res.status(500).send(err, { message: 'На сервере произошла ошибка' }));

const getProfile = (req, res) => User.findById(req.params.id)
  .then((user) => res.status(200).send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      const ERROR_CODE = 404;
      return res.status(ERROR_CODE).send({ message: 'Нет пользователя с таким id' });
    }
    return res.status(500).send({ message: 'На сервере произошла ошибка' });
  });

const createUser = (req, res) => User.countDocuments()
  .then((count) => User.create({ id: count, ...req.body })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        return res.status(ERROR_CODE).send({ message: 'Вы указали некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    }));

const updateProfile = (req, res) => {
  User.findByIdAndUpdate(req.user._id,
    { name: 'Ада Лавлейс' }, {
      new: true,
      runValidators: true,
    })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        return res.status(ERROR_CODE).send({ message: 'Вы указали некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const updateAvatar = (req, res) => {
  User.findByIdAndUpdate(req.user._id,
    { avatar: 'https://cdn.cultofmac.com/wp-content/uploads/2013/04/AlanKay.jpg' }, {
      new: true,
      runValidators: true,
    })
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const ERROR_CODE = 400;
        return res.status(ERROR_CODE).send({ message: 'Вы указали некорректные данные' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
};

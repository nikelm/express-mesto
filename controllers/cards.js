const Card = require('../models/card');

const getCards = (req, res) => Card.find({})
  .then((cards) => res.status(200).send(cards))
  .catch((err) => res.status(500).send(err, { message: 'На сервере произошла ошибка' }));

const createCard = (req, res) => {
  Card.countDocuments()
    .then((count) => Card.create({ id: count, owner: req.user._id, ...req.body })
      .then((card) => res.status(200).send(card))
      .catch((err) => {
        if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
          return res.status(400).send({ message: 'Вы указали некорректные данные' });
        }
        return res.status(500).send({ message: 'На сервере произошла ошибка' });
      }));
};

const deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (!card) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(200).send(card);
    })
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

const dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
        return res.status(404).send({ message: 'Нет карточки с таким id' });
      }
      return res.status(500).send({ message: 'На сервере произошла ошибка' });
    });
};

module.exports = {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
};

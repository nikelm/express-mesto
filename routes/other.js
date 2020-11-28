const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(404).type('json').send({ message: 'Запрашиваемый ресурс не найден' });
});

module.exports = router;

const router = require('express').Router();
const {
  getUsers, getProfile, createUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', getProfile);
router.post('/', createUser);
router.patch('/', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;

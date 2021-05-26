const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const { signup, login } = require('../controllers/authController');
const router = express.Router();

//auth routes
router.post('/signup', signup);
router.post('/login', login);
// user routes
router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById).patch(updateUser).delete(deleteUser);

module.exports = router;

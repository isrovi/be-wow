const express = require('express');

const router = express.Router();

// Controller
// import controller here
const { addUser, getUsers, getUser, deleteUser } = require('../controllers/users');
const { register, login } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

// Route
// add route here
router.post('/user', addUser);

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.delete('/user/:id', deleteUser);

router.post('/login', login);
router.post('/register', register);

module.exports = router;
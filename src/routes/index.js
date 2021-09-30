const express = require('express');

const router = express.Router();

// Controller
// import controller here
const { addUser, getUsers, getUser, deleteUser } = require('../controllers/users');

// Route
// add route here
router.post('/user', addUser);

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.delete('/user/:id', deleteUser);

module.exports = router;
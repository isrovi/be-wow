const express = require('express');

const router = express.Router();

// Controller
// import controller here
const { addUser, getUsers, getUser, deleteUser } = require('../controllers/users');
const { register, login } = require('../controllers/auth');
const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/books');

// Route
// add route here
router.post('/user', addUser);

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.delete('/user/:id', deleteUser);

router.post('/login', login);
router.post('/register', register);

router.post('/book', addBook);
router.get('/books', getBooks);
router.get('/book/:id', getBook);
router.patch('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);

module.exports = router;
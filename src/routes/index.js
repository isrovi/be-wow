const express = require('express');

const router = express.Router();

// Controller
// import controller here
const { addUser, getUsers, getUser, deleteUser } = require('../controllers/users');
const { register, login } = require('../controllers/auth');
const { addBook, getBooks, getBook, updateBook, deleteBook } = require('../controllers/books');
const { addTransaction, updateTransaction, getTransaction, getTransactions } = require('../controllers/transaction');

const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

// Route
// add route here
router.post('/user', addUser);

router.get('/users', getUsers);
router.get('/user/:id', getUser);

router.delete('/user/:id', deleteUser);

router.post('/login', login);
router.post('/register', register);

router.get('/books', getBooks);
router.get('/book/:id', getBook);
router.post('/book', auth, uploadFile('bookFile'), addBook);
router.patch('/book/:id', auth, uploadFile('bookFile'), updateBook);
router.delete('/book/:id', auth, deleteBook);

router.post('/transaction', auth, uploadFile('transferProof'), addTransaction)
router.patch("/transaction/:id", auth, updateTransaction);
router.get("/transaction/:id", auth, getTransaction);
router.get("/transactions", auth, getTransactions);

module.exports = router;
var express = require('express');
var router = express.Router();
var booksController = require('../controllers/books.controller')

/* GET books listing. */
router.get('/', booksController.index);

module.exports = router;

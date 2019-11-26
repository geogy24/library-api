var express = require('express');
var router = express.Router();
var booksController = require('../controllers/booksController')

/* GET books listing. */
router.get('/', booksController.index);

module.exports = router;

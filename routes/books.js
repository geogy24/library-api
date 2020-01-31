var express = require( "express" );
var router = express.Router();
var booksController = require( "../controllers/books.controller" );

/**
 * List books
 * @route GET /books
 * @group Books
 * @returns {object} 200 - An array of user info
 */
router.get( "/", booksController.index );

/**
 * Deletes a book
 * @route DELETE /books/:id
 * @group Books
 * @param {string} id.query.required - Books ID
 * @returns {object} 200
 * @returns {Error}  404 - Model not found
 */
router.delete( "/:id", booksController.delete );

/**
 * Show a required book
 * @route GET /books/:id
 * @group Books
 * @param {string} id.query.required - Books ID
 * @returns {object} 200 - An object of user info
 * @returns {object} 404 - Model not found
 * @returns {object} 500 - Can not execute the query
 */
router.get( "/:id", booksController.show );

/**
 * Update a book
 * @route PUT /books/:id
 * @group Books
 * @param {string} title.body.required - title
 * @param {string} - isbn
 * @param {text} resume.body.required - resume
 * @param {integer} subject.body.required - subject ID
 * @param {integer} author.body.required - author ID
 * @returns {object} 200
 * @returns {object} 404 - Model not found
 */
router.put( "/:id", booksController.update );

/**
 * Creates a book
 * @route POST /books
 * @group Books
 * @param {string} title.body.required - title
 * @param {string} - isbn
 * @param {text} resume.body.required - resume
 * @param {integer} subject.body.required - subject ID
 * @param {integer} author.body.required - author ID
 * @returns {object} 200 - A book object
 * @returns {Error}  500 - Can not create the model
 */
router.post( "/", booksController.create );

module.exports = router;

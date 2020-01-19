var express = require( "express" );
var router = express.Router();
var authorsController = require( "../controllers/authors.controller" );

/**
 * List authors
 * @route GET /authors
 * @group Authors
 * @returns {object} 200 - An array of user info
 */
router.get( "/", authorsController.index );

/**
 * Deletes an author
 * @route DELETE /authors/:id
 * @group Authors
 * @param {string} id.query.required - Authors ID
 * @returns {object} 200
 * @returns {Error}  404 - Model not found
 */
router.delete( "/:id", authorsController.delete );

/**
 * Show a required author
 * @route GET /authors/:id
 * @group Authors
 * @param {string} id.query.required - Authors ID
 * @returns {object} 200 - An object of user info
 * @returns {object} 404 - Model not found
 * @returns {object} 500 - Can not execute the query
 */
router.get( "/:id", authorsController.show );

/**
 * Update an author
 * @route PUT /authors/:id
 * @group Authors
 * @param {string} id.query.required - Authors ID
 * @param {string} name.body.required - Name of the author
 * @returns {object} 200
 * @returns {object} 404 - Model not found
 */
router.put( "/:id", authorsController.update );

/**
 * Creates a author of a book
 * @route POST /authors
 * @group Authors
 * @param {string} name.body.required - name
 * @returns {object} 200 - A author object
 * @returns {Error}  500 - Can not create the model
 */
router.post( "/", authorsController.create );

module.exports = router;

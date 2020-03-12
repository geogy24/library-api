var express = require( "express" );
var router = express.Router();
var usersController = require( "../controllers/users.controller" );

/**
 * List users
 * @route GET /users
 * @group User
 * @returns {object} 200 - An array of user info
 */
router.get( "/", usersController.index );

/**
 * Deletes a user
 * @route DELETE /users/:id
 * @group User
 * @param {string} id.query.required - User ID
 * @returns {object} 200
 * @returns {Error}  404 - Model not found
 */
router.delete( "/:id", usersController.delete );

/**
 * Show a required user
 * @route GET /users/:id
 * @group User
 * @param {string} id.query.required - User ID
 * @returns {object} 200 - An object of user info
 * @returns {object} 404 - Model not found
 * @returns {object} 500 - Can not execute the query
 */
router.get( "/:id", usersController.show );

/**
 * Update a user
 * @route PUT /users/:id
 * @group User
 * @param {string} id.query.required - User ID
 * @param {string} name.body.required - Name of the user
 * @param {string} surname.body.required - Surname of the user
 * @param {string} password.body.required - Password of the user
 * @param {string} email.body.required - Email of the user
 * @returns {object} 200
 * @returns {object} 404 - Model not found
 */
router.put( "/:id", usersController.update );

/**
 * Creates a user
 * @route POST /users
 * @group User
 * @param {string} name.body.required - Name
 * @param {string} surname.body.required - Surname
 * @param {string} password.body.required - Password
 * @param {string} email.body.required - Email
 * @returns {object} 200 - A user object
 * @returns {Error}  500 - Can not create the model
 */
router.post( "/", usersController.create );

module.exports = router;

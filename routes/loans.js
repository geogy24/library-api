var express = require( "express" );
var router = express.Router();
var loansController = require( "../controllers/loans.controller" );
var usersMiddleware = require( "../middlewares/users.middleware" );

/**
 * Creates a user
 * @route POST /loans
 * @group Loans
 * @param {integer} book.body.required - book id
 * @param {integer} user.body.required - user id
 * @returns {object} 200 - A loan object
 * @returns {Error}  500 - Can not create the model
 */
router.post( "/", usersMiddleware.verifySession, loansController.create );

module.exports = router;

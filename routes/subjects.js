var express = require( "express" );
var router = express.Router();
var subjectsController = require( "../controllers/subjects.controller" );

router.get( "/", subjectsController.index );
router.get( "/:id", subjectsController.show );
router.post( "/", subjectsController.create );

module.exports = router;

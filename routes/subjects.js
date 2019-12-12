var express = require( "express" );
var router = express.Router();
var subjectsController = require( "../controllers/subjects.controller" );

router.get( "/", subjectsController.index );
router.delete( "/:id", subjectsController.delete );
router.get( "/:id", subjectsController.show );
router.put( "/:id", subjectsController.update );
router.post( "/", subjectsController.create );

module.exports = router;

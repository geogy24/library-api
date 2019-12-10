var models = require( "../models" );
var subjectsSerializer = require( "../serializers/subjects.serializer" );

module.exports.index = ( _request, response ) => {
	models.Subject.findAll().then( ( items ) => {
		response.json( subjectsSerializer.serialize( items ) );
	} );
};

module.exports.create = ( request, response ) => {
	const subject = request.body.subject;

	models.Subject.create( {
		name: subject.name
	} ).then( ( item ) => {
		response.status( 201 ).json( subjectsSerializer.serialize( item ) );
	} ).catch( () => {
		response.status( 500 ).json( { error: "can not create model." } );
	} );
};

module.exports.show = ( request, response ) => {
	const id = request.params.id;

	models.Subject.findByPk( id ).then( ( item ) => {
		if ( item ) {
			response.json( subjectsSerializer.serialize( item ) );
		} else {
			response.status( 404 ).json( { error: "can not found." } );	
		}
	} ).catch( () => {
		response.status( 500 ).json( { error: "can not do the query." } );
	} );
};
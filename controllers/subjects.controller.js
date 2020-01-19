var models = require( "../models" );
var subjectsSerializer = require( "../serializers/subjects.serializer" );
const errors = require( "../pojos/errors" );
 

module.exports.index = ( _request, response ) => {
	models.Subject.findAll().then( ( items ) => {
		response.json( subjectsSerializer.serialize( items ) );
	} );
};

module.exports.show = ( request, response ) => {
	const id = request.params.id;

	models.Subject.findByPk( id ).then( ( item ) => {
		if ( item ) {
			response.json( subjectsSerializer.serialize( item ) );
		} else {
			response.status( 404 ).json( errors.notFoundError() );
		}
	} ).catch( () => {
		response.status( 500 ).json( errors.queryError() );
	} );
};

module.exports.delete = ( request, response ) => {
	const id = request.params.id;

	models.Subject.destroy( {
		where: { 
			id: id
		}
	} ).then( ( ) => {
		response.sendStatus( 200 );
	} ).catch( () => {
		response.status( 404 ).json( errors.notDestroyError() );
	} );
};

module.exports.create = ( request, response ) => {
	const subject = request.body.subject;

	models.Subject.create( {
		name: subject.name
	} ).then( ( item ) => {
		response.status( 201 ).json( subjectsSerializer.serialize( item ) );
	} ).catch( () => {
		response.status( 500 ).json( errors.notCreateError() );
	} );
};

module.exports.update = ( request, response ) => {
	const id = request.params.id;
	const subject = request.body.subject;

	models.Subject.findByPk( id ).then( ( item ) => {
		item.update( subject ).then( () => {
			response.sendStatus( 200 );
		} );
	} ).catch( () => {
		response.status( 404 ).json( errors.notFoundError() );
	} );
};

var models = require( "../models" );
var authorsSerializer = require( "../serializers/authors.serializer" );
const errors = require( "../pojos/errors" );
 

module.exports.index = ( _request, response ) => {
	models.Author.findAll().then( ( items ) => {
		response.json( authorsSerializer.serialize( items ) );
	} );
};

module.exports.show = ( request, response ) => {
	const id = request.params.id;

	models.Author.findByPk( id ).then( ( item ) => {
		if ( item ) {
			response.json( authorsSerializer.serialize( item ) );
		} else {
			response.status( 404 ).json( errors.notFoundError() );
		}
	} ).catch( () => {
		response.status( 500 ).json( errors.queryError() );
	} );
};

module.exports.delete = ( request, response ) => {
	const id = request.params.id;

	models.AuthorBook.destroy( { where: { authorId: id } } );

	models.Author.destroy( {
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
	const author = request.body.author;

	models.Author.create( {
		name: author.name
	} ).then( ( item ) => {
		response.status( 201 ).json( authorsSerializer.serialize( item ) );
	} ).catch( () => {
		response.status( 500 ).json( errors.notCreateError() );
	} );
};

module.exports.update = ( request, response ) => {
	const id = request.params.id;
	const author = request.body.author;

	models.Author.findByPk( id ).then( ( item ) => {
		item.update( author ).then( () => {
			response.sendStatus( 200 );
		} );
	} ).catch( () => {
		response.status( 404 ).json( errors.notFoundError() );
	} );
};

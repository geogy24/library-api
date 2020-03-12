const bcrypt = require( "bcrypt" );

var models = require( "../models" );
var usersSerializer = require( "../serializers/users.serializer" );
const errors = require( "../pojos/errors" );

module.exports.index = ( _request, response ) => {
	models.User.findAll().then( ( items ) => {
		response.json( usersSerializer.serialize( items ) );
	} );
};

module.exports.show = ( request, response ) => {
	const id = request.params.id;

	models.User.findByPk( id ).then( ( item ) => {
		if ( item ) {
			response.json( usersSerializer.serialize( item ) );
		} else {
			response.status( 404 ).json( errors.notFoundError() );
		}
	} ).catch( () => {
		response.status( 500 ).json( errors.queryError() );
	} );
};

module.exports.delete = ( request, response ) => {
	const id = request.params.id;

	models.User.destroy( {
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
	const user = request.body.user;
	if ( user.password != null && user.password != undefined ) user.password = bcrypt.hashSync( user.password, 1 );

	models.User.create( {
		name: user.name,
		surname: user.surname,
		email: user.email,
		password: user.password
	} ).then( ( item ) => {
		response.status( 201 ).json( usersSerializer.serialize( item ) );
	} ).catch( () => {
		response.status( 500 ).json( errors.notCreateError() );
	} );
};

module.exports.update = ( request, response ) => {
	const id = request.params.id;
	const user = request.body.user;
	if ( user.password != null && user.password != undefined ) user.password = bcrypt.hashSync( user.password, 1 );

	models.User.findByPk( id ).then( ( item ) => {
		item.update( user ).then( () => {
			response.sendStatus( 200 );
		} );
	} ).catch( () => {
		response.status( 404 ).json( errors.notFoundError() );
	} );
};

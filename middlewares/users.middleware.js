var jwt = require( "jwt-simple" );

const errors = require( "../pojos/errors" );

module.exports.verifySession = ( request, response, next ) => {
	if ( request.headers.authorization && jwt.decode( request.headers.authorization, process.env.SECRET ) ) {
		next();
	} else {
		response.status( 401 ).json( errors.unauthorized() );
	}
};

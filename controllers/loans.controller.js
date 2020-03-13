var models = require( "../models" );
var loansSerializer = require( "../serializers/loans.serializer" );
const errors = require( "../pojos/errors" );

module.exports.create = ( request, response ) => {
	models.Loan.create( {
		bookId: request.body.loan.book,
		userId: request.body.loan.user
	} ).then( ( item ) => {
		response.status( 201 ).json( loansSerializer.serialize( item ) );
	} ).catch( () => {
		response.status( 500 ).json( errors.notCreateError() );
	} );
};

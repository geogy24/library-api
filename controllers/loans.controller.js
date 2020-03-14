var models = require( "../models" );
var loansSerializer = require( "../serializers/loans.serializer" );
const errors = require( "../pojos/errors" );

module.exports.create = ( request, response ) => {
	models.Loan.create( {
		bookId: request.body.loan.book,
		userId: request.body.loan.user
	} ).then( ( item ) => {
		models.Loan.findAll( {
			where: { id: item.id },
			include: [ {
				model: models.Book
			},
			{
				model: models.User
			} ]
		} ).then( ( items ) => {
			response.status( 201 ).json( loansSerializer.serialize( items ) );
		} );
	} ).catch( () => {
		response.status( 500 ).json( errors.notCreateError() );
	} );
};

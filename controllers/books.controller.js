var models = require( "../models" );
var booksSerializer = require( "../serializers/books.serializer" );
const errors = require( "../pojos/errors" );
 

module.exports.index = ( _request, response ) => {
	models.Book.findAll( {
		include: [
			{ model: models.Subject },
			{ model: models.Author }
		]
	} ).then( ( items ) => {
		response.json( booksSerializer.serialize( items ) );
	} );
};

module.exports.show = ( request, response ) => {
	const id = request.params.id;

	models.Book.findByPk( id, {
		include: [
			{ model: models.Subject },
			{ model: models.Author }
		]
	} ).then( ( item ) => {
		if ( item ) {
			response.json( booksSerializer.serialize( item ) );
		} else {
			response.status( 404 ).json( errors.notFoundError() );
		}
	} ).catch( () => {
		response.status( 500 ).json( errors.queryError() );
	} );
};

module.exports.delete = ( request, response ) => {
	const id = request.params.id;

	models.AuthorBook.destroy( { where: { bookId: id } } );

	models.Book.destroy( {
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
	const book = request.body.book;
	const authorId = request.body.book.author;
	const subjectId = request.body.book.subject;

	models.Book.create( {
		title: book.title,
		isbn: book.isbn,
		resume: book.resume,
		subjectId: subjectId
	} ).then( ( item ) => {
		models.AuthorBook.create( { bookId: item.id, authorId: authorId } );

		response.status( 201 ).json( booksSerializer.serialize( item ) );
	} ).catch( () => {
		response.status( 500 ).json( errors.notCreateError() );
	} );
};

module.exports.update = ( request, response ) => {
	const id = request.params.id;
	const book = request.body.book;
	const authorId = request.body.book.author;
	const subjectId = request.body.book.subject;

	models.Book.findByPk( id ).then( ( item ) => {
		item.update( {
			title: book.title,
			isbn: book.isbn,
			resume: book.resume,
			subjectId: subjectId
		} ).then( () => {
			models.AuthorBook.destroy( { where: { bookId: id } } );
			models.AuthorBook.create( { bookId: item.id, authorId: authorId } );

			response.sendStatus( 200 );
		} );
	} ).catch( () => {
		response.status( 404 ).json( errors.notFoundError() );
	} );
};

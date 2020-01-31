var JSONAPISerializer = require( "jsonapi-serializer" ).Serializer;

module.exports = new JSONAPISerializer( "books", {
	attributes: [ "title", "isbn", "resume", "Subject", "Authors" ],
} );

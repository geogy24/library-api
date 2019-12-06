var JSONAPISerializer = require( "jsonapi-serializer" ).Serializer;
 
module.exports = new JSONAPISerializer( "books", {
	attributes: [ "name", "title", "isbn" ]
} );

var JSONAPISerializer = require( "jsonapi-serializer" ).Serializer;
 
module.exports = new JSONAPISerializer( "loans", {
	attributes: [ "User", "Book" ]
} );

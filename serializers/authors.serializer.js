var JSONAPISerializer = require( "jsonapi-serializer" ).Serializer;
 
module.exports = new JSONAPISerializer( "authors", {
	attributes: [ "name" ]
} );

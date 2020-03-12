var JSONAPISerializer = require( "jsonapi-serializer" ).Serializer;
 
module.exports = new JSONAPISerializer( "users", {
	attributes: [ "name", "surname", "email" ]
} );

var JSONAPISerializer = require( "jsonapi-serializer" ).Serializer;
 
module.exports = new JSONAPISerializer( "subjects", {
	attributes: [ "name" ]
} );

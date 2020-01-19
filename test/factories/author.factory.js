const faker = require( "faker" );
const models = require( "../../models" );
const factory = require( "factory-girl" ).factory;

factory.define( "author", models.Author, {
	name: faker.lorem.words(  )
} );

module.exports = factory;
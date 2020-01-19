const faker = require( "faker" );
const models = require( "../../models" );
const factory = require( "factory-girl" ).factory;

factory.define( "subject", models.Subject, {
	name: faker.lorem.words(  )
} );

module.exports = factory;
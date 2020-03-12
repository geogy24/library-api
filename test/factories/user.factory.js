const faker = require( "faker" );
const models = require( "../../models" );
const factory = require( "factory-girl" ).factory;

factory.define( "user", models.User, {
	name: faker.lorem.words(  ),
	surname: faker.lorem.words(  ),
	email: faker.internet.email(  ),
	password: faker.lorem.words(  )
} );

module.exports = factory;
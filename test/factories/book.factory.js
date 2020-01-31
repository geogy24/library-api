const faker = require( "faker" );
const models = require( "../../models" );
const factory = require( "factory-girl" ).factory;
const subject = require( "./subject.factory" );  // eslint-disable-line no-unused-vars

factory.define( "book", models.Book, {
	title: faker.lorem.words(  ),
	isbn: faker.lorem.words(  ),
	resume: faker.lorem.words(  ),
	subjectId: factory.assoc( "subject", "id" )
} );

module.exports = factory;
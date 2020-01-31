const request = require( "supertest" );
const app = require( "../../app" );
const faker = require( "faker" );
const bookFactory = require( "../factories/book.factory" );
const subjectFactory = require( "../factories/subject.factory" );
const authorFactory = require( "../factories/author.factory" );
const JSONAPIDeserializer = require( "jsonapi-serializer" ).Deserializer;
const errors = require( "../../pojos/errors" );

let response;
let book;
let body;
let subject;
let author;

describe( "#index", (  ) => {
	beforeEach( async (  ) => {
		book = await bookFactory.create( "book" );
		response = await request( app ).get( "/v1/books" );
		body = await new JSONAPIDeserializer().deserialize( response.body );
	} );

	it( "response 200 ok", async () => {
		expect( response.statusCode ).toEqual( 200 );
		body.forEach( el => {
			expect( parseInt( el.id ) ).toEqual( book.dataValues.id );
			expect( el.name ).toEqual( book.dataValues.name );
		} );
	} );
} );

describe( "#show", (  ) => {
	describe( "when object exist", () => {
		beforeEach( async (  ) => {
			book = await bookFactory.create( "book" );
			response = await request( app ).get( `/v1/books/${book.dataValues.id}` );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
			expect( parseInt( body.id ) ).toEqual( book.dataValues.id );
			expect( body.name ).toEqual( book.dataValues.name );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/books/${faker.random.number( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );

	describe( "when send invalid data", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/books/${faker.lorem.word(  )}` );
		} );

		it( "response 500 error", async () => {
			expect( response.statusCode ).toEqual( 500 );
			expect( response.body ).toEqual( errors.queryError() );
		} );
	} );
} );

describe( "#delete", (  ) => {
	describe( "when object exist", () => {
		beforeEach( async (  ) => {
			book = await bookFactory.create( "book" );
			response = await request( app ).delete( `/v1/books/${book.dataValues.id}` );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).delete( `/v1/books/${faker.lorem.word( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notDestroyError() );
		} );
	} );
} );

describe( "#create", (  ) => {
	describe( "when create book", () => {
		beforeEach( async (  ) => {
			subject = await subjectFactory.create( "subject" );
			author = await authorFactory.create( "author" );
			book = await bookFactory.build( "book" );
			
			book.dataValues.subject = subject.dataValues.id;
			book.dataValues.author = author.dataValues.id;
			
			response = await request( app ).post( "/v1/books" ).send( { book: book.dataValues } );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 201 created", async () => {
			expect( response.statusCode ).toEqual( 201 );
			expect( body.name ).toEqual( book.dataValues.name );
			expect( parseInt( body.id ) ).toBeGreaterThan( 0 );
		} );
	} );

	describe( "when data is invalid", () => {
		beforeEach( async (  ) => {
			response = await request( app ).post( "/v1/books" ).send( { book: {} } );
		} );

		it( "response 500 error", async () => {
			expect( response.statusCode ).toEqual( 500 );
			expect( response.body ).toEqual( errors.notCreateError() );
		} );
	} );
} );

describe( "#update", (  ) => {
	describe( "when create book", () => {
		beforeEach( async (  ) => {
			book = await bookFactory.create( "book" );
			response = await request( app ).put(  `/v1/books/${book.dataValues.id}` ).send( { book: faker.lorem.words() } );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when book does not exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).put(  `/v1/books/${faker.random.number()}` ).send( { book: { name: "" } } );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );
} );
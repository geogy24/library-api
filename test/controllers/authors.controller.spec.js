const request = require( "supertest" );
const app = require( "../../app" );
const faker = require( "faker" );
const authorFactory = require( "../factories/author.factory" );
const JSONAPIDeserializer = require( "jsonapi-serializer" ).Deserializer;
const errors = require( "../../pojos/errors" );

let response;
let author;
let body;

describe( "#index", (  ) => {
	beforeEach( async (  ) => {
		author = await authorFactory.create( "author" );
		response = await request( app ).get( "/v1/authors" );
		body = await new JSONAPIDeserializer().deserialize( response.body );
	} );

	it( "response 200 ok", async () => {
		expect( response.statusCode ).toEqual( 200 );
		body.forEach( el => {
			expect( parseInt( el.id ) ).toEqual( author.dataValues.id );
			expect( el.name ).toEqual( author.dataValues.name );
		} );
	} );
} );

describe( "#show", (  ) => {
	describe( "when object exist", () => {
		beforeEach( async (  ) => {
			author = await authorFactory.create( "author" );
			response = await request( app ).get( `/v1/authors/${author.dataValues.id}` );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
			expect( parseInt( body.id ) ).toEqual( author.dataValues.id );
			expect( body.name ).toEqual( author.dataValues.name );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/authors/${faker.random.number( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );

	describe( "when send invalid data", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/authors/${faker.lorem.word(  )}` );
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
			author = await authorFactory.create( "author" );
			response = await request( app ).delete( `/v1/authors/${author.dataValues.id}` );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).delete( `/v1/authors/${faker.lorem.word( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notDestroyError() );
		} );
	} );
} );

describe( "#create", (  ) => {
	describe( "when create author", () => {
		beforeEach( async (  ) => {
			author = await authorFactory.build( "author" );
			response = await request( app ).post( "/v1/authors" ).send( { author: author.dataValues } );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 201 created", async () => {
			expect( response.statusCode ).toEqual( 201 );
			expect( body.name ).toEqual( author.dataValues.name );
			expect( parseInt( body.id ) ).toBeGreaterThan( 0 );
		} );
	} );

	describe( "when data is invalid", () => {
		beforeEach( async (  ) => {
			response = await request( app ).post( "/v1/authors" ).send( { author: {} } );
		} );

		it( "response 500 error", async () => {
			expect( response.statusCode ).toEqual( 500 );
			expect( response.body ).toEqual( errors.notCreateError() );
		} );
	} );
} );

describe( "#update", (  ) => {
	describe( "when create author", () => {
		beforeEach( async (  ) => {
			author = await authorFactory.create( "author" );
			response = await request( app ).put(  `/v1/authors/${author.dataValues.id}` ).send( { author: faker.lorem.words() } );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when author does not exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).put(  `/v1/authors/${faker.random.number()}` ).send( { author: { name: "" } } );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );
} );
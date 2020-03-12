const request = require( "supertest" );
const app = require( "../../app" );
const faker = require( "faker" );
const userFactory = require( "../factories/user.factory" );
const JSONAPIDeserializer = require( "jsonapi-serializer" ).Deserializer;
const errors = require( "../../pojos/errors" );

let response;
let user;
let body;

describe( "#index", (  ) => {
	beforeEach( async (  ) => {
		user = await userFactory.create( "user" );
		response = await request( app ).get( "/v1/users" );
		body = await new JSONAPIDeserializer().deserialize( response.body );
	} );

	it( "response 200 ok", async () => {
		expect( response.statusCode ).toEqual( 200 );
		body.forEach( el => {
			expect( parseInt( el.id ) ).toEqual( user.dataValues.id );
			expect( el.name ).toEqual( user.dataValues.name );
		} );
	} );
} );

describe( "#show", (  ) => {
	describe( "when object exist", () => {
		beforeEach( async (  ) => {
			user = await userFactory.create( "user" );
			response = await request( app ).get( `/v1/users/${user.dataValues.id}` );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
			expect( parseInt( body.id ) ).toEqual( user.dataValues.id );
			expect( body.name ).toEqual( user.dataValues.name );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/users/${faker.random.number( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );

	describe( "when send invalid data", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/users/${faker.lorem.word(  )}` );
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
			user = await userFactory.create( "user" );
			response = await request( app ).delete( `/v1/users/${user.dataValues.id}` );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).delete( `/v1/users/${faker.lorem.word( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notDestroyError() );
		} );
	} );
} );

describe( "#create", (  ) => {
	describe( "when create user", () => {
		beforeEach( async (  ) => {
			user = await userFactory.build( "user" );
			response = await request( app ).post( "/v1/users" ).send( { user: user.dataValues } );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 201 created", async () => {
			expect( response.statusCode ).toEqual( 201 );
			expect( body.name ).toEqual( user.dataValues.name );
			expect( parseInt( body.id ) ).toBeGreaterThan( 0 );
		} );
	} );

	describe( "when data is invalid", () => {
		beforeEach( async (  ) => {
			response = await request( app ).post( "/v1/users" ).send( { user: {} } );
		} );

		it( "response 500 error", async () => {
			expect( response.statusCode ).toEqual( 500 );
			expect( response.body ).toEqual( errors.notCreateError() );
		} );
	} );
} );

describe( "#update", (  ) => {
	describe( "when create user", () => {
		beforeEach( async (  ) => {
			user = await userFactory.create( "user" );
			response = await request( app ).put(  `/v1/users/${user.dataValues.id}` ).send( { user: faker.lorem.words() } );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when user does not exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).put(  `/v1/users/${faker.random.number()}` ).send( { user: { name: "" } } );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );
} );
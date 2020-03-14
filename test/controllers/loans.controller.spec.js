const request = require( "supertest" );
const app = require( "../../app" );
const userFactory = require( "../factories/user.factory" );
const bookFactory = require( "../factories/book.factory" );
const JSONAPIDeserializer = require( "jsonapi-serializer" ).Deserializer;
const errors = require( "../../pojos/errors" );

let response;
let user;
let book;
let body;

describe( "#create", (  ) => {
	describe( "when create loan", () => {
		beforeEach( async (  ) => {
			user = await userFactory.create( "user" );
			book = await bookFactory.create( "book" );
			response = await request( app ).post( "/v1/loans" ).send(
				{ loan: { user: user.dataValues.id, book: book.dataValues.id } }
			);
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 201 created", async () => {
			expect( response.statusCode ).toEqual( 201 );
			expect( body.data ).not.toBeNull( );
		} );
	} );

	describe( "when data is invalid", () => {
		beforeEach( async (  ) => {
			response = await request( app ).post( "/v1/loans" ).send( { loan: {} } );
		} );

		it( "response 500 error", async () => {
			expect( response.statusCode ).toEqual( 500 );
			expect( response.body ).toEqual( errors.notCreateError() );
		} );
	} );
} );

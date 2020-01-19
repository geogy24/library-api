const request = require( "supertest" );
const app = require( "../../app" );
const faker = require( "faker" );
const subjectFactory = require( "../factories/subject.factory" );
const JSONAPIDeserializer = require( "jsonapi-serializer" ).Deserializer;
const errors = require( "../../pojos/errors" );

let response;
let subject;
let body;

describe( "#index", (  ) => {
	beforeEach( async (  ) => {
		subject = await subjectFactory.create( "subject" );
		response = await request( app ).get( "/v1/admin/subjects" );
		body = await new JSONAPIDeserializer().deserialize( response.body );
	} );

	it( "response 200 ok", async () => {
		expect( response.statusCode ).toEqual( 200 );
		body.forEach( el => {
			expect( parseInt( el.id ) ).toEqual( subject.dataValues.id );
			expect( el.name ).toEqual( subject.dataValues.name );
		} );
	} );
} );

describe( "#show", (  ) => {
	describe( "when object exist", () => {
		beforeEach( async (  ) => {
			subject = await subjectFactory.create( "subject" );
			response = await request( app ).get( `/v1/admin/subjects/${subject.dataValues.id}` );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
			expect( parseInt( body.id ) ).toEqual( subject.dataValues.id );
			expect( body.name ).toEqual( subject.dataValues.name );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/admin/subjects/${faker.random.number( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );

	describe( "when send invalid data", () => {
		beforeEach( async (  ) => {
			response = await request( app ).get( `/v1/admin/subjects/${faker.lorem.word(  )}` );
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
			subject = await subjectFactory.create( "subject" );
			response = await request( app ).delete( `/v1/admin/subjects/${subject.dataValues.id}` );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when object doesn't exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).delete( `/v1/admin/subjects/${faker.lorem.word( )}` );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notDestroyError() );
		} );
	} );
} );

describe( "#create", (  ) => {
	describe( "when create subject", () => {
		beforeEach( async (  ) => {
			subject = await subjectFactory.build( "subject" );
			response = await request( app ).post( "/v1/admin/subjects" ).send( { subject: subject.dataValues } );
			body = await new JSONAPIDeserializer().deserialize( response.body );
		} );

		it( "response 201 created", async () => {
			expect( response.statusCode ).toEqual( 201 );
			expect( body.name ).toEqual( subject.dataValues.name );
			expect( parseInt( body.id ) ).toBeGreaterThan( 0 );
		} );
	} );

	describe( "when data is invalid", () => {
		beforeEach( async (  ) => {
			response = await request( app ).post( "/v1/admin/subjects" ).send( { subject: {} } );
		} );

		it( "response 500 error", async () => {
			expect( response.statusCode ).toEqual( 500 );
			expect( response.body ).toEqual( errors.notCreateError() );
		} );
	} );
} );

describe( "#update", (  ) => {
	describe( "when create subject", () => {
		beforeEach( async (  ) => {
			subject = await subjectFactory.create( "subject" );
			response = await request( app ).put(  `/v1/admin/subjects/${subject.dataValues.id}` ).send( { subject: faker.lorem.words() } );
		} );

		it( "response 200 ok", async () => {
			expect( response.statusCode ).toEqual( 200 );
		} );
	} );

	describe( "when subject does not exist", () => {
		beforeEach( async (  ) => {
			response = await request( app ).put(  `/v1/admin/subjects/${faker.random.number()}` ).send( { subject: { name: ""} } );
		} );

		it( "response 404 not found", async () => {
			expect( response.statusCode ).toEqual( 404 );
			expect( response.body ).toEqual( errors.notFoundError() );
		} );
	} );
} );
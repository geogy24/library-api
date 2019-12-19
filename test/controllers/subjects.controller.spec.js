const nock = require( "nock" );
const axios = require( "axios" );
const faker = require( "faker" );

const baseUrl = "http://localhost:3000";

describe( "Subjects controller", (  ) => {
	const subject = {
		name: faker.lorem.words(  )
	};

	beforeEach( (  ) => {
		nock( baseUrl ).get( "/subjects" ).reply( 200, subject );
	} );

	test( "#index", ( done ) => {
		return axios.get( `${baseUrl}/subjects` )
			.then( ( response ) => {
				expect( response.status ).toEqual( 200 );
				expect( response.data ).toEqual( subject );
				done( );
			} );
	} );
} );

var JSONAPIError = require( "jsonapi-serializer" ).Error;
 
module.exports = {
	notFoundError: () => {
		return new JSONAPIError( {
			code: "1",
			title: "Object can not found"
		} );
	},
	queryError: () => {
		return new JSONAPIError( {
			code: "2",
			title: "Query error"
		} );
	},
	notCreateError: () => {
		return new JSONAPIError( {
			code: "3",
			title: "Can not create model error"
		} );
	},
	notDestroyError: () => {
		return new JSONAPIError( {
			code: "4",
			title: "Can not destroy model error"
		} );
	},
	notUpdateError: () => {
		return new JSONAPIError( {
			code: "5",
			title: "Can not update model error"
		} );
	},
	unauthorized: () => {
		return new JSONAPIError( {
			code: "6",
			title: "unauthorized"
		} );
	}
};

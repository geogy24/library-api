module.exports = {
	development: {
		username: process.env.DEVELOPMENT_USER_DATABASE,
		password: process.env.DEVELOPMENT_PASSWORD_DATABASE,
		database: process.env.DEVELOPMENT_NAME_DATABASE,
		host: process.env.HOST,
		dialect: "postgres",
		logging: false,
	},
	test: {
		username: process.env.TEST_USER_DATABASE,
		password: process.env.TEST_PASSWORD_DATABASE,
		database: process.env.TEST_NAME_DATABASE,
		host: process.env.HOST,
		dialect: "postgres",
		logging: false,
	},
	production: {
		username: process.env.PRODUCTION_USER_DATABASE,
		password: process.env.PRODUCTION_PASSWORD_DATABASE,
		database: process.env.PRODUCTION_NAME_DATABASE,
		host: process.env.HOST,
		dialect: "postgres",
		logging: false,
		pool: {
			max: 5,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
};

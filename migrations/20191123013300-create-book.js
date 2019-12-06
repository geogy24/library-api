"use strict";
module.exports = {
	up: ( queryInterface, Sequelize ) => {
		return queryInterface.createTable( "Books", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			title: {
				allowNull: false,
				type: Sequelize.STRING
			},
			isbn: {
				allowNull: false,
				type: Sequelize.STRING,
			},
			resume: {
				type: Sequelize.TEXT
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		} )
			.then( () => queryInterface.addIndex( "Books", [ "title" ] ) )
			.then( () => queryInterface.addIndex( "Books", [ "isbn" ] ) );
	},
	down: ( queryInterface ) => {
		return queryInterface.dropTable( "Books" );
	}
};

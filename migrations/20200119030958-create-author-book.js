"use strict";
module.exports = {
	up: ( queryInterface, Sequelize ) => {
		return queryInterface.createTable( "AuthorBooks", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			authorId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Authors",
						key: "id"
					}
				},
				allowNull: false
			},
			bookId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Books",
						key: "id"
					}
				},
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		} );
	},
	down: ( queryInterface ) => {
		return queryInterface.dropTable( "AuthorBooks" );
	}
};
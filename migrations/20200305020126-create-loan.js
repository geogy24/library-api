"use strict";
module.exports = {
	up: ( queryInterface, Sequelize ) => {
		return queryInterface.createTable( "Loans", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			userId: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "Users",
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
		return queryInterface.dropTable( "Loans" );
	}
};

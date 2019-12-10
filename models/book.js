"use strict";
module.exports = ( sequelize, DataTypes ) => {
	const Book = sequelize.define( "Book", {
		title: {
			type: DataTypes.STRING,
			validate: {
				allowNull: true
			}
		},
		isbn: {
			type: DataTypes.STRING,
			validate: {
				allowNull: true
			}
		},
		resume: {
			type: DataTypes.TEXT
		}
	}, {} );
	Book.associate = function( models ) {
		// associations can be defined here
		Book.belongsTo( models.Subject );
	};
	return Book;
};

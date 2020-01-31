"use strict";
//var models = require( "../models" );

module.exports = ( sequelize, DataTypes ) => {
	const Book = sequelize.define( "Book", {
		title: {
			type: DataTypes.STRING
		},
		isbn: {
			type: DataTypes.STRING,
			allowNull: true
		},
		resume: {
			type: DataTypes.TEXT
		},
		subjectId: {
			type: DataTypes.INTEGER
		}
	}, {} );
	Book.associate = function( models ) {
		// associations can be defined here
		Book.belongsTo( models.Subject, { foreignKey: "subjectId", targetKey: "id" } );
		Book.belongsToMany( models.Author, {
			through: {
				model: models.AuthorBook
			},
			foreignKey: "bookId",
			constraints: false
		} );
	};
	return Book;
};

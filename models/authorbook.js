"use strict";
module.exports = ( sequelize, DataTypes ) => {
	const AuthorBook = sequelize.define( "AuthorBook", {
		authorId: {
			type: DataTypes.INTEGER
		},
		bookId: {
			type: DataTypes.INTEGER
		}
	}, {} );
	AuthorBook.associate = function( ) {
	};
	return AuthorBook;
};
"use strict";
module.exports = ( sequelize, DataTypes ) => {
	const Loan = sequelize.define( "Loan", {
		userId: {
			type: DataTypes.INTEGER
		},
		bookId: {
			type: DataTypes.INTEGER
		}
	}, {} );
	Loan.associate = function( ) {
	};
	return Loan;
};
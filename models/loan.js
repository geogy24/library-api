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
	Loan.associate = function( models ) {
		Loan.belongsTo( models.Book, { foreignKey: "bookId", targetKey: "id" } );
		Loan.belongsTo( models.User, { foreignKey: "userId", targetKey: "id" } );
	};
	return Loan;
};
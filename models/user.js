"use strict";
module.exports =  ( sequelize, DataTypes ) => {
	const User = sequelize.define( "User", {
		name: DataTypes.STRING,
		surname: DataTypes.STRING,
		email: DataTypes.STRING,
		password: DataTypes.STRING
	}, {} );
	User.associate = function( models ) {
		// associations can be defined here
		User.belongsToMany( models.Book, {
			through: {
				model: models.Loan
			},
			foreignKey: "userId",
			constraints: false
		} );
	};
	return User;
};
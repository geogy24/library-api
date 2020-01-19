"use strict";
module.exports =  ( sequelize, DataTypes ) => {
	const Subject = sequelize.define( "Author", {
		name: DataTypes.STRING
	}, {} );
	Subject.associate = function( models ) {
		// associations can be defined here
		Subject.hasMany( models.Book );
	};
	return Subject;
};